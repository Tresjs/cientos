import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import { MarkdownTransform } from './.vitepress/plugins/markdownTransform/index'

export default defineConfig({
  plugins: [
    MarkdownTransform(),
    svgLoader(),
    Unocss(),
    Components({
      // allow auto load markdown components under `.vitepress/theme/components`
      dirs: ['.vitepress/theme/components'],
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'components.d.ts',
    }),
  ],
})
