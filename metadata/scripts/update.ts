import fs from 'node:fs'
import path from 'node:path'

interface CientosComponent {
  name: string
  category: string
  componentPath: string
  package: string
  demoPath?: string
  playgroundPath?: string
}

function input() {
  return {
    PACKAGE_DIR: path.resolve('metadata'),
    BASE_DIR: path.resolve('.'),
    components: [] as CientosComponent[],
  }
}

type Input = ReturnType<typeof input>

function canAccess(input: Input) {
  try {
    fs.accessSync(input.BASE_DIR, fs.constants.R_OK | fs.constants.W_OK)
    console.log(`[OK] Source directory ${input.BASE_DIR} exists.`)
  }
  catch (err) {
    console.error(`[FAIL] Source directory ${input.BASE_DIR} does not exist.`)
    return err
  }
  return input
}

function legacy(input: Input) {
  interface Data { files: string[], componentsByName: Record<string, CientosComponent> }

  const CATEGORIES = new Set(['abstractions', 'controls', 'loaders', 'materials', 'misc', 'shapes', 'staging'])

  function kebabToPascal(k: string) {
    return k.split('-').map(capitalize).join('')
  }

  function kebabToCamel(k: string) {
    const i = k.indexOf('-')
    return i === -1 ? k : k.substring(0, i) + kebabToPascal(k.substring(i + 1))
  }

  function capitalize(s: string) {
    if (s.length < 1) { return s }
    return s[0].toUpperCase() + s.substring(1)
  }

  function getComponentNameCategoryPathPackage(data: Data): Data {
    for (const file of data.files) {
      if (!file.startsWith(`src${path.sep}core`)) { continue }

      const pieces = file.split(path.sep)

      const length = pieces.length
      const [penultimate, last] = [pieces[length - 2], pieces[length - 1]]

      let name = ''

      if (last === 'component.vue' || last === 'index.vue') {
      // NOTE: Match e.g. src/core/abstractions/AnimatedSprite/component.vue
      // NOTE: Match e.g. src/core/materials/customShaderMaterial/index.vue
        name = penultimate
      }
      else if (length === 4 && last.endsWith('.vue')) {
      // NOTE: Match e.g. src/core/abstractions/Reflector.vue
        name = last.substring(0, last.length - 4)
      }
      else if (last.startsWith('HTML')) {
      // NOTE: Match just src/core/misc/HTML/HTML.vue
        name = 'HTML'
      }
      else if (last.endsWith('.ts')) {
        // NOTE: Match e.g. src/core/misc/Stats.ts
        name = last.substring(0, last.length - 3)
      }

      // NOTE: Uppercase names like 'meshWobbleMaterial'
      // but not 'useFBX'
      name = name && !name.startsWith('use') ? name[0].toUpperCase() + name.substring(1) : name

      if (name) {
        data.componentsByName[name] = {
          name,
          category: pieces.filter(piece => CATEGORIES.has(piece))[0],
          componentPath: file,
          package: 'core',
        }
      }
    }

    return data
  }

  function getComponentPlayground(data: Data) {
    for (const file of data.files) {
      let name = ''

      if (!file.startsWith('playground')) { continue }
      if (!file.includes('pages')) { continue }
      if (file === 'playground/vue/src/pages/index.vue') { continue }

      // NOTE: Does not appear to exist. Ignore.
      if (file.endsWith('ReflectorMeshDemo.vue')) { continue }
      if (file.endsWith('OnDemandShapesDemo.vue')) { continue }

      const byName = data.componentsByName
      // NOTE: Demo names do not match components. Handle "manually".
      if (file.endsWith('LaptopDemo.vue')) { byName.HTML.playgroundPath = file; continue }
      if (file.endsWith('EnvironmentDemo.vue')) { byName.useEnvironment.playgroundPath = file; continue }
      if (file.endsWith('GLTFExporterDemo.vue')) { byName.useGLTFExporter.playgroundPath = file; continue }
      if (file.endsWith('GlassMaterialDemo.vue')) { byName.MeshGlassMaterial.playgroundPath = file; continue }
      if (file.endsWith('WobbleMaterialDemo.vue')) { byName.MeshWobbleMaterial.playgroundPath = file; continue }
      if (file.endsWith('UseGLTFDemo.vue')) { byName.useGLTF.playgroundPath = file; continue }
      if (file.endsWith('FBODemo.vue')) { byName.useFBO.playgroundPath = file; continue }

      const last = file.split(path.sep).pop()
      if (last?.endsWith('Demo.vue')) {
        name = last.substring(0, last.length - 'Demo.vue'.length)
      }

      if (name) {
        data.componentsByName[name].playgroundPath = file
      }
    }

    return data
  }

  function getComponentDemo(data: Data) {
    for (let file of data.files) {
      if (!file.startsWith('docs') || !file.endsWith('.md')) { continue }

      // NOTE: Handle names not mapped directly to a component
      // NOTE: Skip these, they're not components
      if (file === 'docs/api-examples.md') { continue }
      if (file === 'docs/markdown-examples.md') { continue }

      // NOTE: These have other demos.
      if (file === 'docs/guide/migrating-from-v3.md') { continue }
      if (file === 'docs/guide/loaders/fbx-model.md') { continue }
      if (file === 'docs/guide/loaders/gltf-model.md') { continue }
      if (file === 'docs/guide/abstractions/fbo.md') { continue }

      // NOTE: These names need to be mapped by hand.
      if (file === 'docs/guide/staging/environment.md') { file = 'docs/guide/staging/useEnvironment.md' }
      if (file === 'docs/guide/shapes/catmullromcurve3.md') { file = 'docs/guide/staging/CatmullRomCurve3.md' }
      if (file === 'docs/guide/misc/html-component.md') { file = 'docs/guide/misc/HTML.md' }
      if (file === 'docs/guide/misc/use-gltf-exporter.md') { file = 'docs/guide/misc/useGLTF.md' }
      if (file === 'docs/guide/materials/glass-material.md') { file = 'docs/guide/materials/MeshGlassMaterial.md' }
      if (file === 'docs/guide/materials/wobble-material.md') { file = 'docs/guide/materials/MeshWobbleMaterial.md' }
      if (file === 'docs/guide/loaders/svg.md') { file = 'docs/guide/loaders/SVG.md' }
      if (file === 'docs/guide/loaders/use-fbx.md') { file = 'docs/guide/loaders/useFBX.md' }
      if (file === 'docs/guide/loaders/use-gltf.md') { file = 'docs/guide/loaders/useGLTF.md' }
      if (file === 'docs/guide/abstractions/text-3d.md') { file = 'docs/guide/abstractions/Text3D.md' }
      if (file === 'docs/guide/abstractions/use-fbo.md') { file = 'docs/guide/abstractions/useFBO.md' }

      const lastWithoutExtension = file.split(path.sep).pop()!.split('.').shift()!
      const maybeComponentName = lastWithoutExtension.startsWith('use') ? kebabToCamel(lastWithoutExtension) : kebabToPascal(lastWithoutExtension)

      if (!maybeComponentName) { continue }
      if (maybeComponentName in data.componentsByName) {
        data.componentsByName[maybeComponentName].demoPath = file
        continue
      }
    }

    return data
  }

  const files = fs.globSync('**/*.{vue,ts,md}', {
    cwd: input.BASE_DIR,
    exclude: (n: string) => {
      return n.includes('node_modules') || n.endsWith('d.ts')
    },
  })

  const data = { files, componentsByName: {} }

  return pipe(
    () => data,
    getComponentNameCategoryPathPackage,
    getComponentPlayground,
    getComponentDemo,
    () => input.components = Object.values(data.componentsByName),
    () => input,
  )
}

function write(input: Input) {
  const categories = Array.from(input.components.reduce((acc, entry) => { acc.add(entry.category); return acc }, new Set<string>())).sort((a, b) => a.localeCompare(b))
  const components = input.components.sort((a, b) => a.name.localeCompare(b.name))
  const fileName = path.join(input.PACKAGE_DIR, 'index.json')
  const data = `${JSON.stringify({ categories, components }, null, 2)}\n`
  console.log(fileName)
  fs.writeFileSync(fileName, data)

  return input
}

/////////////////////////////////////////////////////

function pipe(...fns) {
  return fns.reduce((acc, fn) => {
    const result = fn(acc)
    if (result instanceof Error) {
      throw result
    }
    return result
  }, {})
}

pipe(input, canAccess, legacy, write)
