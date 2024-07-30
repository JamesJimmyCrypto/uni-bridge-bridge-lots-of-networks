// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.WEB3_FULL_STACK_LAYER_SAAS_PATH || "@web3-fullstack/layer-saas"],
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
  sourcemap: true,
  analyze: {
    analyzerMode: 'static'
  },
  debug: true,
  dev: true,
});
