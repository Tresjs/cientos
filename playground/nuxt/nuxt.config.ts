// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'pathe'

export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
  devtools: { enabled: true },

  vite: {
    resolve: {
      alias: {
        '@tresjs/cientos': resolve(__dirname, '../../src/'),
      },
    },
  },

  tres: {
    glsl: true,
  },

  compatibilityDate: '2024-08-30',
})
