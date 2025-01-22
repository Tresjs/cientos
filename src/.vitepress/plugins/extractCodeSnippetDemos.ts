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
            const content = getDemoWithControls(t.content)
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

function getDemoWithControls(srcText: string): string {
  const { script, scriptSetup, template } = parse(srcText).descriptor
  if (!template || !scriptSetup) { return srcText }

  // NOTE: Descend through template AST to find control definition
  // nodes and the nodes they should control
  const openAstNodes = [template.ast] as { source: string, type: number, children: any[] }[]
  let controlInfos = []
  while (openAstNodes.length) {
    const node = openAstNodes.pop()
    if (!node?.children) { continue }
    const children = node.children
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if ('children' in child && child.children) {
        openAstNodes.push(child)
      }
      if (child.loc?.source?.startsWith('<!-- demo-control')) {
        for (let ii = i + 1; ii < children.length; ii++) {
          // NOTE: Find the next sibling that isn't a comment (type 3)
          if (children[ii].type !== 3) {
            // NOTE: We have a control definition and a sibling to
            // apply the control to. So, we'll add a `controlInfo` to
            // create a controlled prop.
            const controlInfo = parseControlDefinition(child.loc.source)
            const nextNonCommentSibling = children[ii]

            const propName = controlInfo.prop
            const prop = (propName && nextNonCommentSibling.props) ? nextNonCommentSibling.props.filter(p => [p.rawName, p.name].includes(propName) || [p.rawName, p.name].includes(`:${propName}`))[0] : null
            if (prop) {
              controlInfo.node = nextNonCommentSibling
              controlInfo.prop = prop
              controlInfos.push(controlInfo)
            }

            break
          }
        }
      }
    }
  }

  // NOTE: Remove any controlInfos we didn't find
  controlInfos = controlInfos.filter(c => c.node !== null)

  // NOTE: Sort controlsInfos in descending order of char offset. Descending
  // order allows us to replace 'abc' with 'abcde' or 'ab' without needing
  // to recalculate the remaining offsets.
  controlInfos.sort((a, b) => b.prop.loc.start.offset - a.prop.loc.start.offset)

  controlInfos.forEach((c, i) => {
    // NOTE: Replace controlled prop's value with a ref
    c.refName = `demoControlRef${i}`
    // NOTE: Replace value in `template` with refName
    const startI = c.prop.loc.start.offset - template.loc.start.offset
    const start = template.content.substring(0, startI)
    const endI = c.prop.loc.end.offset - template.loc.start.offset
    const end = template.content.substring(endI)
    const propName = c.prop.rawName ?? c.prop.name
    const prefix = (propName.startsWith('v-') || propName.startsWith(':')) ? '' : ':'
    const propString = `${prefix}${propName}="${c.refName}"`
    template.content = `${start}${propString}${end}`
  })

  controlInfos.forEach((c) => {
    // NOTE: Add ref to `script setup`
    const val = typeof c.value === 'string' ? `'${c.value}'` : c.value
    scriptSetup.content += `\nconst ${c.refName} = demoRef(${val})`
  })

  const controlsComponents: string[] = []
  const controlsImportsSet = new Set<string>()
  controlInfos.forEach((c) => {
    const controlType = (() => {
      if ('type' in c) { return c.type }
      if (typeof c.value === 'string' && c.value.startsWith('#')) { return 'color' }
      if (typeof c.value === 'string' && 'options' in c) { return 'select' }
      if (typeof c.value === 'string') { return 'text' }
      if (typeof c.value === 'number') { return 'range' }
      if (typeof c.value === 'boolean') { return 'checkbox' }
      return null
    })()

    if (controlType === null) { return }

    const rawLabel = c.label ?? c.prop.rawName ?? c.prop.name
    // NOTE: Normalize labels for UI by removing initial ':', if one exists.
    const label = rawLabel.startsWith(':') ? rawLabel.substring(1) : rawLabel
    const start = `<DocsDemoControl label="${label}">\n`
    const end = `\n</DocsDemoControl>`

    if (controlType === 'checkbox') {
      controlsImportsSet.add('import DocsDemoCheckbox from \'./DocsDemoCheckbox.vue\'')
      controlsComponents.push(`${start}<DocsDemoCheckbox :value="${c.refName}" @change="(v)=>{ ${c.refName} = v }" />${end}`)
    }
    else if (controlType === 'text') {
      controlsImportsSet.add('import DocsDemoText from \'./DocsDemoText.vue\'')
      controlsComponents.push(`${start}<DocsDemoText :value="${c.refName}" @change="(v)=>{ ${c.refName} = v }" />${end}`)
    }
    else if (controlType === 'color') {
      controlsImportsSet.add('import DocsDemoColor from \'./DocsDemoColor.vue\'')
      controlsComponents.push(`${start}<DocsDemoColor :value="${c.refName}" @change="(v)=>{ ${c.refName} = v }" />${end}`)
    }
    else if (controlType === 'select') {
      controlsImportsSet.add('import DocsDemoSelect from \'./DocsDemoSelect.vue\'')
      const options = c.options?.map?.((s: string) => `'${s}'`) ?? `'${c.value}'`
      controlsComponents.push(`${start}<DocsDemoSelect :options="[${options}]" :value="${c.refName}" @change="(v)=>{ ${c.refName} = v }" />${end}`)
    }
    else if (controlType === 'range') {
      controlsImportsSet.add('import DocsDemoRange from \'./DocsDemoRange.vue\'')
      const min = c.min ?? Math.min(c.value, 0)
      const max = c.max ?? Math.max(c.value, 1)
      controlsComponents.push(`${start}<DocsDemoRange :min="${min}" :max="${max}" :step="${c.step ?? 0.01}" :value="${c.refName}" @change="(v)=>{ ${c.refName} = v }" />${end}`)
    }
  })

  const scriptSetupOut = scriptSetup
    ? `<script setup lang="${scriptSetup.lang}">
import { ref as demoRef } from 'vue'${scriptSetup.content}
import DocsDemoWithControls from './DocsDemoWithControls.vue'
${Array.from(controlsImportsSet).join('\n')}
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
${controlsComponents.join('\n')}
</div>
</template>
`
    : ''

  return `${scriptSetupOut}${scriptOut}${templateOut}`
}

function parseControlDefinition(definitionString: string) {
  const childSourceAsFrontmatter = definitionString.split('\n').map((s: string) => s.trim()).join('\n').replace('<!-- demo-control', '---\nprop: ').replace('-->', '---')
  const controlInfo = matter(childSourceAsFrontmatter).data
  if ('options' in controlInfo) {
    // NOTE: Split options by ',' if there's a comma, otherwise by ' '
    const splitChar = controlInfo.options.includes(',') ? ',' : ' '
    controlInfo.options = (controlInfo.options as string).split(splitChar).map(s => s.trim()).filter(s => !!s)
  }
  return controlInfo
}
