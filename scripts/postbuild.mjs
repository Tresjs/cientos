import { readFile, writeFile } from 'node:fs/promises'
import { glob } from 'tinyglobby'

/**
 * Adds `.js` when importing the ./src/index.js in the dts
 *
 * @return {Promise<void>}
 */
async function patchRootDts() {
    const dts = 'dist/index.d.ts'
    const content = await readFile(dts, 'utf8')
    await writeFile(dts, content.replaceAll('./src/index\'', './src/index.js\''))
}

/**
 * Fix node16 issue: https://www.typescriptlang.org/tsconfig/#allowArbitraryExtensions
 * - node10 and bundler will check for d.vue.ts and vue.d.ts file when importing a vue file in a dts
 * - node16 will check only for d.vue.ts file, this function will just copy/paste the content of vue.d.ts to d.vue.ts
 *
 * @return {Promise<void>}
 */
async function patchVueDts() {
    const files = await glob('dist/**/*.vue.d.ts')
    for (const file of files) {
        // console.log(file)
        await writeFile(file.replace('.vue.d.ts', '.d.vue.ts'), await readFile(file, 'utf-8'), 'utf-8')
    }
}

async function fixNode16() {
    await patchVueDts()
}

fixNode16()
