// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    monospaceApiKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSJ9.eyJhdWQiOiJhcGlLZXkiLCJqdGkiOiI4NTM0YmM3MS1lZjlkLTQ1MjctOWQ5NS05ZGNjMTc3MjU5ODciLCJpc3MiOiJEaXJlY3R1cyIsInN1YiI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImlhdCI6MTc3ODI2MDI1MCwiZXhwIjoxODA5ODE3ODUwfQ.cbj-m2F0dDTFsfoPAqQiGCJKUiaVXjGIyEriZ5nlacRa1n--eUl3ZdlgfGf2bagJxeMkDaLnIFztRPhECgocBg",
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit'
      ]
    }
  }
})
