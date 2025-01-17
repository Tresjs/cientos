import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
import type { Plugin } from 'vite'
import { parse } from 'vue/compiler-sfc'

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

          if (t.content.includes('<!-- demo-control')) {
            const content = getDemoWithController(t.content)
            return fsPromises.writeFile(path.join(COMPONENTS_DIRECTORY, `${demoName}.vue`), warning + content)
          }
          else {
            return fsPromises.writeFile(path.join(COMPONENTS_DIRECTORY, `${demoName}.vue`), warning + t.content)
          }
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
        code = code.replace('```vue demo', `<${demoName} />\n\`\`\`vue`)
      }
      return code
    },
  }
}

function getDemoWithController(srcText: string): string {
  const { script, scriptSetup, template } = parse(srcText).descriptor
  if (!template || !scriptSetup) { return srcText }

  const CONTROLS_RE = /<!-- demo-control(.*?)-->/gs
  let controlInfos = Array.from(srcText.matchAll(CONTROLS_RE)).map(match => matter(`---\n${match[1]}\n---`).data)

  for (const controlInfo of controlInfos) {
    controlInfo.selector = controlInfo.selector.split(' ')
    if ('options' in controlInfo) {
      controlInfo.options = controlInfo.options.split(' ')
    }
  }

  // NOTE: match the `selector`
  for (const controlInfo of controlInfos) {
    const path = [...controlInfo.selector]
    let currNode = template?.ast
    while (path.length) {
      const nextSelector = path.shift()
      let nextNode = null as typeof currNode | null
      for (const child of currNode?.children ?? []) {
        if (child.tag === nextSelector) {
          nextNode = child
          continue
        }
      }
      for (const prop of currNode?.props ?? []) {
        if (prop.rawName === nextSelector || prop.name === nextSelector) {
          nextNode = prop
          continue
        }
      }

      if (currNode === null) { controlInfo.node = null }
      currNode = nextNode
    }
    controlInfo.node = controlInfo.node === null ? null : currNode
  }

  // NOTE: Remove any controlInfos we didn't find
  controlInfos = controlInfos.filter(c => c.node !== null)

  // NOTE: Sort the rest in descending order of char offset. Descending
  // order allows us to replace 'abc' with 'abcde' or 'ab' without needing
  // to recalculate the remaining offsets.
  controlInfos.sort((a, b) => b.node.loc.start.offset - a.node.loc.start.offset)

  controlInfos.forEach((c, i) => {
    c.refName = `demoControlRef${i}`
    // NOTE: Replace value in `template` with refName
    const nodeValue = 'exp' in c.node ? c.node.exp : c.node.value
    const isString = nodeValue.loc.source.startsWith('"')
    const quote = isString ? '"' : ''
    const start = nodeValue.loc.start.offset - template.loc.start.offset
    const end = nodeValue.loc.end.offset - template.loc.start.offset
    template.content = template.content.substring(0, start) + quote + c.refName + quote + template.content.substring(end)

    if (isString) {
      // NOTE: The prop was originally a string, but now we want
      // to use a `ref` instead. So we need to prefix the prop
      // name with a `:`.
      const start = c.node.loc.start.offset - template.loc.start.offset
      template.content = `${template.content.substring(0, start)}:${template.content.substring(start)}`
    }
  })

  controlInfos.forEach((c) => {
    // NOTE: Add ref to `script setup`
    const val = typeof c.value === 'string' ? `'${c.value}'` : c.value
    scriptSetup.content += `\nconst ${c.refName} = demoRef(${val})`
  })

  let controlsContent = ''
  controlInfos.forEach((c) => {
    const controlType = (() => {
      if ('type' in c) { return c.type }
      if (typeof c.value === 'string') { return 'select' }
      if (typeof c.value === 'number') { return 'range' }
      if (typeof c.value === 'boolean') { return 'checkbox' }
      return null
    })()

    if (controlType === null) { return }

    const label = c.label ?? c.selector[c.selector.length - 1]
    let control = 'error'
    if (controlType === 'checkbox') {
      control = `<input type="checkbox" onchange="(e) => { ${c.refName} = e.target.checked; console.log(e.target.checked); }" />`
    }
    else if (controlType === 'select') {
      control = `<DocsDemoControl label="${label}">
      <DocsDemoSelect
    :options="[${c.options?.map?.(s => `'${s}'`) ?? `'${c.value}'`}]"
    :value="${c.refName}"
    @change="(v)=>{ ${c.refName} = v }"
  />
  </DocsDemoControl>
     `
    }
    controlsContent += `${control}\n\n`
  })

  const scriptSetupOut = scriptSetup
    ? `<script setup lang="${scriptSetup.lang}">
import DocsDemoWithControls from './DocsDemoWithControls.vue'
import DocsDemoCheckbox from './DocsDemoCheckbox.vue'
import DocsDemoColor from './DocsDemoColor.vue'
import DocsDemoRange from './DocsDemoRange.vue'
import DocsDemoSelect from './DocsDemoSelect.vue'
import { ref as demoRef } from 'vue'${scriptSetup.content}
</script>\n\n`
    : ''

  const scriptOut = script
    ? `<script setup lang="${script.lang}">
${script.content}
</script>\n\n`
    : ''

  const templateOut = template
    ? `<template>
<DocsDemoWithControls>${template.content}</DocsDemoWithControls>
<div>
${controlsContent}
</div>
</template>
`
    : ''

  return `${scriptSetupOut}${scriptOut}${templateOut}`
}
