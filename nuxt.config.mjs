export default defineNuxtConfig({
  app: {
    rootAttrs: { style: 'display: contents' },
  },
  experimental: {
    // Payloads use a subfolder per route, which would collide with the .html files.
    payloadExtraction: false,
  },
  routeRules: {
    '/mountaindog/privacy.html': { prerender: true, noScripts: true },
    '/mountaindog/privacy-en.html': { prerender: true, noScripts: true },
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      failOnError: true,
      ignore: [/^\/$/],
    },
  },
})
