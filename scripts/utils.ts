import { join, normalize, relative, resolve, sep } from 'node:path'
import * as fs from 'node:fs/promises'
import * as fsSync from 'node:fs'
import type { CientosComponent, CientosPackage, PackageIndexes } from '../metadata/types'
import MarkdownIt from 'markdown-it'
import { globSync } from 'node:fs'
import matter from 'gray-matter'

export async function updateImport({ packages, components }: PackageIndexes) {
  for (const { name, dir } of Object.values(packages)) {
    const imports = components
      .filter(component => component.package === name && component.component.endsWith('.vue'))
      .map(component => `import ${component.name} from './${relative(dir, component.component)}'`)
      .sort((a, b) => a.localeCompare(b))

    const exports = components
      .filter(component => component.package === name && component.component.endsWith('.vue'))
      .map(component => component.name)
      .sort((a, b) => a.localeCompare(b))

    const data = `// NOTE: Generated by scripts/utils/updateImport
// Do not make edits here - they will be overwritten.
${imports.join('\n')}

export {
${exports.map(s => `  ${s}`).join(',\n')},
}
`

    await fs.writeFile(join(dir, 'index.ts'), data)
  }
}

export async function updatePlaygroundRoutes({ components }: PackageIndexes) {
  const imports = [] as string[]
  const routes = [] as string[]
  const outDir = normalize('playground/vue/src')
  const out = join(outDir, 'router.ts')

  for (const c of components) {
    if (!c.playground) { continue }
    const playgroundName = `${c.name}Playground`

    imports.push(`import ${playgroundName} from './${relative(outDir, c.playground)}'`)

    routes.push(
      `  {
    path: '/${c.package}/${c.name}',
    name: '${c.name}',
    component: ${playgroundName},
  }`,
    )
  }

  const data = `// NOTE: Generated by scripts/utils/updatePlaygroundRoutes
// Do not make edits here - they will be overwritten.
import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/index.vue'
${imports.join('\n')}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
${routes.join(',\n')},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
`

  await fs.writeFile(out, data)
}

const DOCS_BASE_PATH = 'docs'
const DOCS_COMPONENTS_PATH = 'docs/.vitepress/theme/components'

export async function updateDocs({ packages, components }: PackageIndexes) {
  // NOTE: Remove prior generated docs markdown
  await Promise.all(Object.keys(packages).map(packageName => fs.rm(join(DOCS_BASE_PATH, packageName), { recursive: true, force: true })))

  // NOTE: Remove prior generated CodeSnippetDemos*
  const existingComponents = globSync(`${DOCS_COMPONENTS_PATH}/CodeSnippetDemo*.*`)
  await Promise.all(existingComponents.map(c => fs.rm(c)))

  const markdownit = MarkdownIt()

  await Promise.all(components.map((component) => {
    if (component.docs) {
      const dirPath = join(DOCS_BASE_PATH, component.package, component.name)
      const data: DocsMdInfo = {
        dir: dirPath,
        md: '',
        component,
        codeSnippetDemoInfo: [] as CodeSnippetDemoInfo[],
        markdownit,
      }

      return new Promise<DocsMdInfo>(resolve => fs.readFile(component.docs!, 'utf-8')
        .then((str) => { data.md = str; resolve(data) }))
        .then(data => fs.mkdir(data.dir, { recursive: true }).then(() => data))
        .then(getCodeSnippetsFromMd)
        .then(writeCodeSnippetDemosToFile)
        .then(insertCodeSnippetDemosInMd)
        .then(data => fs.writeFile(join(data.dir, 'index.md'), data.md, 'utf-8'))
    }
    return () => {}
  }))

  interface CodeSnippetDemoInfo {
    content: string
    name: string
    extension: string
    lineNumber: number
  }

  interface DocsMdInfo {
    dir: string
    md: string
    component: CientosComponent
    codeSnippetDemoInfo: CodeSnippetDemoInfo[]
    markdownit: MarkdownIt
  }

  function getCodeSnippetsFromMd(data: DocsMdInfo) {
    const tokens = data.markdownit.parse(data.md, {}).filter(token => token.tag === 'code' && token.info.includes(':demo'))
    data.codeSnippetDemoInfo = tokens.map((t, i) => ({
      content: t.content,
      name: `CodeSnippetDemo${data.component.name}${i}`,
      extension: t.info.split(':')[0] ?? 'vue',
      lineNumber: t.map ? t.map[0] : 0,
    }))
    return data
  }

  function writeCodeSnippetDemosToFile(data: DocsMdInfo) {
    return Promise.all(data.codeSnippetDemoInfo.map(
      info => fs.writeFile(join(DOCS_COMPONENTS_PATH, `${info.name}.${info.extension}`), info.content, 'utf-8'),
    )).then(() => data)
  }

  function insertCodeSnippetDemosInMd(data: DocsMdInfo) {
    for (const codeSnippetDemo of data.codeSnippetDemoInfo) {
      data.md = data.md.replace('```vue:demo', `<DocsDemo><${codeSnippetDemo.name} /></DocsDemo>\n\n\`\`\`vue`)
    }
    return data
  }
}

/////////////////////////////////////////////////////

export async function updateMetadata(): Promise<PackageIndexes> {
  const ALLOWED_CATEGORIES = new Set(['abstractions', 'controls', 'loaders', 'materials', 'misc', 'shapes', 'staging'])
  const input = getInput()
  await canAccess(input)
  getComponents(input)
  getPackageIndexes(input)
  await write(input)
  return input.packageIndexes

  interface Input {
    PACKAGE_DIR: string
    BASE_DIR: string
    packages: Record<CientosPackage['name'], CientosPackage>
    packageIndexes: PackageIndexes
  }

  function getInput() {
    return {
      PACKAGE_DIR: resolve('metadata'),
      BASE_DIR: resolve('.'),
      packages: {} as Record<CientosPackage['name'], CientosPackage>,
      packageIndexes: {} as PackageIndexes,
    }
  }

  function canAccess(input: Input) {
    return fs.access(input.BASE_DIR, fs.constants.R_OK | fs.constants.W_OK)
      .then(() => input)
  }

  function getComponents(input: Input) {
    // TODO: loop through available packages.
    if (!input.packages.core) {
      input.packages.core = {
        name: 'core',
        dir: 'src/core',
        categories: [],
        components: [],
      }
    }

    const componentMds = fsSync.globSync('src/core/*/index.md')
    const componentDirectories = componentMds.map((p) => p.split(sep).slice(0, -1).join(sep))
    const componentFiles = new Set(fsSync.globSync('src/core/*/*.*'))

    componentDirectories.sort()

    const components = input.packages.core.components
    const categories = new Set(input.packages.core.categories)

    for (const componentDirectory of componentDirectories) {
      const mdPath = join(componentDirectory, 'index.md')
      const mdRaw = fsSync.readFileSync(mdPath, 'utf-8')
      const { data: frontmatter } = matter(mdRaw)

      try {
        fsSync.accessSync(input.BASE_DIR, fs.constants.R_OK | fs.constants.W_OK)
      }
      catch {
        throw new Error(`Expected \`component.vue\` in ${componentDirectory}}`)
      }

      const [componentPackage, name] = componentDirectory.split('/').slice(-2)

      const component: CientosComponent = {
        name,
        package: componentPackage,
        category: frontmatter.category ?? 'uncategorized',
        component: `${componentDirectory}/component.vue`,
      }

      if (!ALLOWED_CATEGORIES.has(component.category)) {
        const msg = `Category for <${component.name} /> ("${component.category}") is not in allowed categories. You probably made a typo.\nAllowed categories: ${Array.from(ALLOWED_CATEGORIES).map(s => `"${s}"`).join(', ')}`
        throw new Error(msg)
      }

      categories.add(component.category)

      if (componentFiles.has(`${componentDirectory}/index.md`)) {
        component.docs = `${componentDirectory}/index.md`
      }
      else {
        component.internal = true
      }

      if (componentFiles.has(`${componentDirectory}/demo.vue`)) {
        component.demo = `${componentDirectory}/demo.vue`
      }

      if (componentFiles.has(`${componentDirectory}/playground.vue`)) {
        component.playground = `${componentDirectory}/playground.vue`
      }

      if (frontmatter.deprecated) {
        component.deprecated = true
      }

      if (frontmatter.related) {
        component.related = frontmatter.related
      }

      components.push(component)
    }

    input.packages.core.categories = Array.from(categories)

    return input
  }

  function getPackageIndexes(input: Input) {
    const categories = new Set<string>()
    const components = [] as CientosComponent[]
    for (const p of Object.values(input.packages)) {
      for (const category of p.categories) {
        categories.add(category)
      }
      for (const component of p.components) {
        components.push(component)
      }
    }

    input.packageIndexes = {
      packages: input.packages,
      categories: Array.from(categories),
      components,
    }

    return input
  }

  function write(input: Input) {
    const fileName = join(input.PACKAGE_DIR, 'index.json')
    const data = `${JSON.stringify(input.packageIndexes, null, 2)}\n`
    fsSync.writeFileSync(fileName, data)

    return input
  }
}
