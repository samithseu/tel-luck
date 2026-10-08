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
      routes: ["/"],
    },
  },

  experimental: {
    early404: true,
    prerenderErrorPages: true,
    stripNeverHydratedData: true,
    payloadExtraction: false,
  },

  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  modules: ["@nuxt/icon", "@nuxt/fonts", "@vite-pwa/nuxt"],

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Telephone Luck - ទស្សន៍ទាយលេខទូរសព្ទ",
      short_name: "Tel-Luck",
      description:
        "ទស្សន៍ទាយលេខទូរសព្ទតាមក្បួនតម្រាបុរាណ 80 ខ្ទង់ - Phone number numerology with instant calculation.",
      theme_color: "#09090b",
      background_color: "#09090b",
      display: "standalone",
      orientation: "portrait",
      scope: process.env.NUXT_APP_BASE_URL || "/",
      start_url: process.env.NUXT_APP_BASE_URL || "/",
      lang: "km",
      categories: ["lifestyle", "utilities"],
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: process.env.NUXT_APP_BASE_URL
        ? `${process.env.NUXT_APP_BASE_URL}200.html`
        : "/200.html",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2}"],
      globIgnores: [
        "**/node_modules/**/*",
        "**/*.{gz,br}",
        "CNAME",
        ".nojekyll",
        "robots.txt",
      ],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
    },
  },

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
