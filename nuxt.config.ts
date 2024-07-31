// import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.WEB3_FULL_STACK_LAYER_SAAS_PATH || "@web3-fullstack/layer-saas"],
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
  //  modules: [
  //   '@nuxt/content',
  //   '@nuxt/image',
  //   '@nuxt/ui',
  //   '@nuxt/fonts',
  //   '@vueuse/nuxt',
  //   // 'nuxt-og-image',
  //   '@vue-macros/nuxt',
  //   'nuxt-lodash',
  //   '@nuxtjs/supabase',
  //   'nuxt-gtag',
  //   '@pinia/nuxt'
  // ],
  content: {
    documentDriven: true
  },
  // vite: {
  //   plugins: [
  //     ReactivityTransform()
  //   ],
  // },
  // ssr: false
  // sourcemap: true,
  // analyze: {
  //   analyzerMode: 'static'
  // },
  // debug: true,
  // dev: true,
});
