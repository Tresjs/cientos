import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import MarkdownIt from 'markdown-it'
import type { Plugin } from 'vite'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const toAbsolute = (p: string) => path.resolve(__dirname, p)

const MDS_GLOB = toAbsolute('../../*/*/index.md')
const COMPONENTS_DIRECTORY = toAbsolute('../theme/components')
const COMPONENTS_PREFIX = 'CientosCodeSnippetDemo'

export function CodeSnippetDemosBuildTransform(): Plugin {
  return {
    name: 'cientos-md-extract-code-snippet-demos',
    enforce: 'pre',
    async buildStart() {
      // NOTE: Remove existing code snippet demos.
      const existingCodeSnippetsDemos = fs.globSync(path.join(COMPONENTS_DIRECTORY, `${COMPONENTS_PREFIX}*.*`))
      await Promise.all(existingCodeSnippetsDemos.map(c => fsPromises.rm(c)))

      // NOTE: Create code snippet demos from md files.
      const markdownit = MarkdownIt()
      const paths = fs.globSync(MDS_GLOB)
      const pathsContents = await Promise.all(paths.map(p => fsPromises.readFile(p, 'utf-8').then(content => ({ content, path: p }))))

      await Promise.all(pathsContents.map(({ path: p, content }) => {
        const tokens = markdownit.parse(content, {}).filter(t => t.tag === 'code' && t.info.includes('demo') && t.info.includes('vue'))
        const pieces = p.split(path.sep)
        const componentName = pieces[pieces.length - 2]
        let i = 0
        return Promise.all(tokens.map((t) => {
          const demoName = `${COMPONENTS_PREFIX}${componentName}Snippet${i++}`
          const warning = '// NOTE: Automatically generated. Edits will be discarded.\n'
          return fsPromises.writeFile(path.join(COMPONENTS_DIRECTORY, `${demoName}.vue`), warning + t.content)
        }))
      }))
    },
    async transform(code, id) {
      // NOTE: Insert the demo in front of its code snippet
      const markdownit = MarkdownIt()
      const tokens = markdownit.parse(code, {})
      const codeSnippetDemos = tokens.filter(token => token.tag === 'code' && token.info.includes('demo') && token.info.includes('vue'))
      const pieces = id.split(path.sep)
      const componentName = pieces[pieces.length - 2]
      for (let i = 0; i < codeSnippetDemos.length; i++) {
        const demoName = `${COMPONENTS_PREFIX}${componentName}Snippet${i}`
        code = code.replace('```vue demo', `<DocsDemo><${demoName} /></DocsDemo>\n\`\`\`vue`)
      }
      return code
    },
  }
}
