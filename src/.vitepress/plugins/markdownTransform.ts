import type { Plugin } from 'vite'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
// import { packages } from '../../../meta/packages'
import { components, getComponent } from '../../../metadata/metadata'

export function MarkdownTransform(): Plugin {
  const DIR_TYPES = resolve(__dirname, '../../../dist')
  const hasTypes = existsSync(DIR_TYPES)

  if (!hasTypes) { console.warn('No types dist found, run `npm run build:types` first.') }

  return {
    name: 'cientos-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/)) { return null }
      const [pkg, _name, _] = id.split('/').slice(-3)

      const maybeComponent = components.find(c => c.docs && id.endsWith(c.docs))

      const name = maybeComponent ? maybeComponent.name : ''

      if (name) {
        const frontmatterEnds = code.indexOf('---\n\n')
        const firstHeader = code.search(/\n#{2,6}\s.+/)
        const sliceIndex = firstHeader < 0 ? frontmatterEnds < 0 ? 0 : frontmatterEnds + 4 : firstHeader

        const { footer, header } = await getComponentMarkdown(pkg, name)

        if (hasTypes) {
          code = replacer(code, footer, 'FOOTER', 'tail')
        }

        if (header) {
          code = code.slice(0, sliceIndex) + header + code.slice(sliceIndex)
        }

        // NOTE: Replace demo-controls markup and leading/trailing whitespace
        code = code.replace(/\s*<!-- demo-control([\s\S]*?)-->\S*/gi, '')
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

  const positiveNOrInfinity = (n: number) => n < 0 ? Number.POSITIVE_INFINITY : n

  if (types) {
    // NOTE: Types arrive with a lot of automatically generated cruft.
    // Trim it off.
    const trimFromHere = Math.min(
      positiveNOrInfinity(types.indexOf('declare function __VLS_template(): {')),
      positiveNOrInfinity(types.indexOf('declare const _default:')),
    )
    const trimmedTypes = types.trim().substring(0, trimFromHere)

    const code = `\`\`\`typescript\n${trimmedTypes}\n\`\`\``
    typingSection = `\n## Type Declarations\n\n${code}`
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

  const footer = `${typingSection}\n\n${sourceSection}\n`

  return {
    header: '',
    footer,
  }
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

  const DIR_DTS = resolve(__dirname, '../../../dist')
  const FILE_DTS = join(DIR_DTS, `${component.path}/component.vue.d.ts`)

  if (!existsSync(FILE_DTS)) { return }

  let types = readFileSync(FILE_DTS, 'utf-8')

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
