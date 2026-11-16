export default defineNuxtConfig({
  app: {
    rootAttrs: { style: 'display: contents' },
  },
  experimental: {
    // Payloads use a subfolder per route, which would collide with the .html files.
    payloadExtraction: false,
    prerenderErrorPages: [404],
  },
  routeRules: {
    '/': { prerender: true, noScripts: true },
    '/mountaindog': { prerender: true, noScripts: true },
    '/404.html': { noScripts: true },
    '/mountaindog/privacy.html': { prerender: true, noScripts: true },
    '/mountaindog/privacy-en.html': { prerender: true, noScripts: true },
    '/mountaindog/terms.html': { prerender: true, noScripts: true },
    '/mountaindog/terms-en.html': { prerender: true, noScripts: true },
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      failOnError: true,
      ignore: [/^\/200\.html$/],
    },
  },
})
