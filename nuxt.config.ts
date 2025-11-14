export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
  ],
  ssr: false,
  imports: {
    imports: [
      {
        from: 'tailwind-variants',
        name: 'tv',
      },
    ],
  },
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
