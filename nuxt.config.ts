import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
  },

  nitro: {
    preset: "github-pages",
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ["/", "/api/luck"],
    },
  },

  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  modules: ["@nuxt/icon", "@nuxt/fonts"],

  icon: {
    clientBundle: { scan: true },
    serverBundle: "auto",
  },

  fonts: {
    families: [
      {
        name: "Kantumruy Pro",
        styles: ["normal"],
        weights: [400, 500, 600, 700],
        subsets: ["khmer"],
        global: true,
      },
      {
        name: "Inter",
        styles: ["normal"],
        weights: [400, 500, 600, 700],
        subsets: ["latin"],
        global: true,
      },
    ],
  },
});
