// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.WEB3_FULL_STACK_LAYER_SAAS_PATH || '@web3-fullstack/layer-saas'],
  ui: {
    primary: 'red', // pick from https://tailwindcss.com/docs/customizing-colors#color-palette-reference
    gray: 'cool'
  },
  colorMode: {
    preference: 'dark'
  }
})
