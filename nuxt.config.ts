import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  modules: ["@nuxt/icon", "@nuxt/fonts"],
  app: { baseURL: "/tel-luck/" },
  icon: { serverBundle: "auto" },
  nitro: { prerender: { routes: ["/api/luck"] } },
  fonts: {
    families: [
      {
        name: "Inter",
        styles: ["normal"],
        weights: [300, 400, 600, 700],
        subsets: ["latin"],
        global: true,
      },
      {
        name: "Kantumruy Pro",
        styles: ["normal"],
        weights: [300, 400, 500, 600, 700],
        subsets: ["khmer"],
        global: true,
      },
    ],
  },
});
