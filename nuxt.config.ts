// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', 'v-gsap-nuxt'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/style/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
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
  vgsap: {
    presets: [],
    breakpoint: 768,
    scroller: '',
    composable: true
  },

})