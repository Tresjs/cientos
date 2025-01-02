// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import MarkdownIt from 'markdown-it'
import type { Plugin } from 'vite'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const toAbsolute = p => path.resolve(__dirname, p)

// determine routes to pre-render from ../
const routesToExtract = fs
  .globSync(toAbsolute('../../*/*/index.md'))
  .map((file) => {
    const name = file.replace(/\.vue$/, '').toLowerCase()
    return name === 'home' ? `/` : `/${name}`
  })

const COMPONENTS_DIRECTORY = toAbsolute('../theme/components')
const COMPONENTS_PREFIX = 'CientosCodeSnippetDemo'

function extract(): Plugin {
  return {
    name: 'cientos-md-extract-code-snippet-demos',
    enforce: 'pre',
    buildStart(options) {
        console.log(options)
    },
    async transform(code, id) {
      const markdownit = MarkdownIt()
      const tokens = markdownit.parse(code, {})
      const codeSnippetDemos = tokens.filter(token => token.tag === 'code' && token.info.includes('demo') && token.info.includes('vue'))
      const pieces = id.split(path.sep)
      const componentName = pieces[pieces.length - 2]
      let i = 0
      for (const token of codeSnippetDemos) {
        const demoName = `${COMPONENTS_PREFIX}${componentName}Snippet${i++}`
        const p = path.join(COMPONENTS_DIRECTORY, `${demoName}.vue`)
        fs.writeFileSync(p, token.content, 'utf-8')
        code = code.replace('```vue demo', `<DocsDemo><${demoName} /></DocsDemo>\n\`\`\`vue`)
      }
      return code
    },
  }
}

function insert() {

}

export default function (): Plugin[] { return [extract()] }
