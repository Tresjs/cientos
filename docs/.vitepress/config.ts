import { resolve } from 'pathe'
import { defineConfig } from 'vitepress'
import { components as _components, categoryNames, components } from '../../metadata/metadata'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const whitelist = ['TresCanvas', 'TresLeches', 'TresScene']

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Cientos',
  description:
    'Collection of useful helpers and fully functional, ready-made abstractions for TresJS',
  head: [
    ['link', { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#82DBC5' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@tresjs_dev' }],
    ['meta', { name: 'twitter:creator', content: '@tresjs_dev' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Cientos - TresJS' }],
    [
      'meta',
      {
        property: 'og:image',
        content:
          'https://repository-images.githubusercontent.com/571314349/10996566-7f70-473b-a8e5-4e56fc0ca850',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content:
          'https://repository-images.githubusercontent.com/571314349/10996566-7f70-473b-a8e5-4e56fc0ca850',
      },
    ],
    [
      'script',
      {
        'defer': 'true',
        'data-site': 'OWBUVCJK',
        'src': 'https://cdn.usefathom.com/script.js',
      },
    ],
  ],
  rewrites: getRewrites(),
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/component-list/' },
      { text: 'Examples', link: 'https://lab.tresjs.org/' },
    ],

    sidebar: getSidebar(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tresjs/cientos' },
      { icon: 'twitter', link: 'https://twitter.com/tresjs_dev' },
      { icon: 'discord', link: 'https://discord.gg/UCr96AQmWn' },
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: ['vitepress'],
      include: ['three'],
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
    resolve: {
      alias: {
        '@tresjs/cientos': resolve(__dirname, '../../dist/trescientos.js'),
      },
      dedupe: ['three'],
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) =>
          (tag.startsWith('Tres') && !whitelist.includes(tag))
          || tag === 'primitive',
      },
    },
  },
})

function getSidebar() {
  const links = [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/guide/' },
        { text: 'Migration from v3', link: '/guide/migrating-from-v3' },
      ],
      collapsed: false,
    },
  ]

  for (const name of categoryNames) {
    const components = _components.filter(c => c.category === name)

    links.push({
      text: name,
      items: components.map(c => ({
        text: c.name,
        link: `/${c.package}/${c.name}`,
      })),
      collapsed: true,
    })
  }

  return links
}

function getRewrites() {
  return _components.reduce((acc, c) => {
    if (c.docsPath) {
      const relativePath = c.docsPath.substring('docs/'.length)
      acc[relativePath] = `${c.package}/${c.name}.md`
      acc[relativePath] = `${c.package}/${c.name}.md`
    }
    return acc
  }, {})
}