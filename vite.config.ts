import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
/* import analyze from 'rollup-plugin-analyzer' */

/* import { visualizer } from 'rollup-plugin-visualizer' */
import { templateCompilerOptions } from '@tresjs/core'

import { bold, gray, lightGreen, yellow } from 'kolorist'

import { resolve } from 'pathe'
import glsl from 'vite-plugin-glsl'

// eslint-disable-next-line no-console
console.log(`${lightGreen('▲')} ${gray('■')} ${yellow('♥')} ${bold('Tres/cientos')}`)
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ['@tresjs/core'],
  },
  plugins: [
    vue({
      isProduction: false,
      ...templateCompilerOptions,
    }),
    dts({
      insertTypesEntry: true,
    }),
    glsl(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'trescientos',
      fileName: 'trescientos',
    },
    copyPublicDir: false,
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    rollupOptions: {
      plugins: [
        /*  analyze(), */
        /* visualizer({
          gzipSize: true,
          brotliSize: true,
          open: true,
        }), */
      ],
      external: ['three', 'vue', '@tresjs/core'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@tresjs/core': 'TresjsCore',
          'three': 'Three',
          'vue': 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['three', 'vue', '@tresjs/core'],
  },
})
