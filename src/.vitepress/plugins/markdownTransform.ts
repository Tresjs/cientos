import type { Plugin } from 'vite'
import { existsSync, readFile, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { format } from 'prettier'
import ts from 'typescript'
// import { packages } from '../../../meta/packages'
import { componentNames, components, getComponent } from '../../../metadata/metadata'

export function MarkdownTransform(): Plugin {
  const DIR_TYPES = resolve(__dirname, '../../../dist')
  const hasTypes = existsSync(DIR_TYPES)

  if (!hasTypes) { console.warn('No types dist found, run `npm run build:types` first.') }

  return {
    name: 'cientos-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/)) { return null }

      // NOTE: linkify function names
      code = code.replace(
        new RegExp(`\`({${componentNames.join('|')}})\`(.)`, 'g'),
        (_, name, ending) => {
          if (ending === ']') {
            // NOTE: already a link
            return _
          }
          const fn = getComponent(name)!
          return `[\`${fn.name}\`](${fn.docsPath}) `
        },
      )

      // NOTE: Convert links to relative
      code = code.replace(/https?:\/\/cientos\.tresjs\.org\//g, '/')

      // NOTE: Format codeblocks
      // First, find `CientosComponent`
      const [pkg, _name, i] = id.split('/').slice(-3)

      const maybeComponent = components.find(c => c.docsPath && id.endsWith(c.docsPath))

      const name = maybeComponent ? maybeComponent.name : ''

      if (name) {
        const frontmatterEnds = code.indexOf('---\n\n')
        const firstHeader = code.search(/\n#{2,6}\s.+/)
        const sliceIndex = firstHeader < 0 ? frontmatterEnds < 0 ? 0 : frontmatterEnds + 4 : firstHeader

        // Insert JS/TS code blocks
        code = await replaceAsync(code, /\n```ts( [^\n]+)?\n(.+?)\n```\n/gs, async (_, meta = '', snippet = '') => {
          const formattedTS = (await format(snippet.replace(/\n+/g, '\n'), { semi: false, singleQuote: true, parser: 'typescript' })).trim()
          const js = ts.transpileModule(formattedTS, {
            compilerOptions: { target: 99 },
          })
          const formattedJS = (await format(js.outputText, { semi: false, singleQuote: true, parser: 'typescript' }))
            .trim()
          if (formattedJS === formattedTS) { return _ }
          return `
<CodeToggle>
<div class="code-block-ts">

\`\`\`ts ${meta}
${snippet}
\`\`\`

</div>
<div class="code-block-js">

\`\`\`js
${formattedJS}
\`\`\`

</div>
</CodeToggle>\n`
        })

        const { footer, header } = await getComponentMarkdown(pkg, name)

        if (hasTypes) {
          code = replacer(code, footer, 'FOOTER', 'tail')
        }

        if (header) {
          code = code.slice(0, sliceIndex) + header + code.slice(sliceIndex)
        }

        code = code
          .replace(/(# \w+)\n/, `$1\n\n<FunctionInfo fn="${name}"/>\n`)
          .replace(/## (Components?(?:\sUsage)?)/i, '## $1\n<LearnMoreComponents />\n\n')
          .replace(/## (Directives?(?:\sUsage)?)/i, '## $1\n<LearnMoreDirectives />\n\n')
      }

      return code
    },
  }
}

const DIR_SRC = resolve(__dirname, '../..')
const GITHUB_BLOB_URL = 'https://github.com/Tresjs/cientos/blob/main/src'

export async function getComponentMarkdown(pkg: string, name: string) {
  const URL = `${GITHUB_BLOB_URL}/${pkg}/${name}`

  const dirname = join(DIR_SRC, pkg, name)
  const demoPath = ['demo.vue', 'demo.client.vue'].find(i => existsSync(join(dirname, i)))
  const types = await getTypeDefinition(pkg, name)

  if (!types) { console.warn(`No types found for ${pkg}/${name}`) }

  let typingSection = ''

  if (types) {
    const code = `\`\`\`typescript\n${types.trim()}\n\`\`\``
    typingSection = types.length > 1000
      ? `
## Type Declarations

<details>
<summary op50 italic cursor-pointer select-none>Show Type Declarations</summary>

${code}

</details>
`
      : `\n## Type Declarations\n\n${code}`
  }

  const links = ([
    ['Source', `${URL}/index.ts`],
    demoPath ? ['Demo', `${URL}/${demoPath}`] : undefined,
    ['Docs', `${URL}/index.md`],
  ])
    .filter(i => i)
    .map(i => `[${i![0]}](${i![1]})`)
    .join(' • ')

  const sourceSection = `## Source\n\n${links}\n`
  const ContributorsSection = `
## Contributors

<Contributors fn="${name}" />
  `
  const changelogSection = `
## Changelog

<Changelog fn="${name}" />
`

  const demoSection = demoPath
    ? demoPath.endsWith('.client.vue')
      ? `
<script setup>
import { defineAsyncComponent } from 'vue'
const Demo = defineAsyncComponent(() => import('./${demoPath}'))
</script>

## Demo

<DemoContainer>
<p class="demo-source-link"><a href="${URL}/${demoPath}" target="_blank">source</a></p>
<ClientOnly>
  <Suspense>
    <Demo/>
    <template #fallback>
      Loading demo...
    </template>
  </Suspense>
</ClientOnly>
</DemoContainer>
`
      : `
<script setup>
import Demo from \'./${demoPath}\'
</script>

## Demo

<DemoContainer>
<p class="demo-source-link"><a href="${URL}/${demoPath}" target="_blank">source</a></p>
<Demo/>
</DemoContainer>
`
    : ''

  const footer = `${typingSection}\n\n${sourceSection}\n${ContributorsSection}\n${changelogSection}\n`

  const header = demoSection

  return {
    footer,
    header,
  }
}

function replaceAsync(str: string, match: RegExp, replacer: (substring: string, ...args: any[]) => Promise<string>) {
  const promises: Promise<string>[] = []
  str.replace(match, (...args) => {
    promises.push(replacer(...args))
    return ''
  })
  return Promise.all(promises).then(replacements => str.replace(match, () => replacements.shift()!))
}

function replacer(code: string, value: string, key: string, insert: 'head' | 'tail' | 'none' = 'none') {
  const START = `<!--${key}_STARTS-->`
  const END = `<!--${key}_ENDS-->`
  const regex = new RegExp(`${START}[\\s\\S]*?${END}`, 'im')

  const target = value ? `${START}\n\n${value.trim()}\n\n${END}` : `${START}${END}`

  if (!code.match(regex)) {
    if (insert === 'none') { return code }
    else if (insert === 'head') { return `${target}\n\n${code}` }
    else { return `${code}\n\n${target}` }
  }

  return code.replace(regex, target)
}

export async function getTypeDefinition(pkg: string, name: string): Promise<string | undefined> {
  const component = getComponent(name)
  if (!component) { return }
  const componentPath = component.componentPath.split('/').slice(1).join('/')

  const DIR_TYPES = resolve(__dirname, '../../../dist')
  const typingFilepath = join(DIR_TYPES, `${componentPath}.d.ts`)

  if (!existsSync(typingFilepath)) { return }

  let types = readFileSync(typingFilepath, 'utf-8')

  // NOTE: clean up types
  types = types
    .replace(/import\(.*?\)\./g, '')
    .replace(/import[\s\S]+?from ?["'][\s\S]+?["']/g, '')
    .replace(/export \{\}/g, '')

  const prettier = await import('prettier')
  return (await prettier
    .format(
      types,
      {
        semi: false,
        parser: 'typescript',
      },
    ))
    .trim()
}
