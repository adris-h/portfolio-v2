// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', 'v-gsap-nuxt'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/style/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://use.typekit.net/vso6msv.css' }],
    },
    baseURL: '/portfolio-v2/'
  },
  components: [
    {
      path: '~/components/',
      pathPrefix: true
    }
  ],


})