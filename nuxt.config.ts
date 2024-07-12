import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.WEB3_FULL_STACK_LAYER_SAAS_PATH || "@web3-fullstack/layer-saas"],
  ui: {
    primary: "red", // pick from https://tailwindcss.com/docs/customizing-colors#color-palette-reference
    gray: "cool",
  },
  colorMode: {
    preference: "dark",
    fallback: 'dark'
  },
  build: {
    // transpile: ['@psf/bitcoincashjs-lib']
  },
  optimizeDeps: {
    include: ['@swapkit/sdk > @psf/bitcoincashjs-lib']
  },
  ssr: false,
  vite: {
    plugins: [
      nodePolyfills({
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
    ],
  },
});
