import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  modules: ["@nuxt/icon", "@nuxt/fonts"],
  icon: { serverBundle: "auto" },
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
        name: "Google Sans",
        styles: ["normal"],
        weights: [300, 400, 500, 600, 700],
        subsets: ["khmer"],
        global: true,
      },
    ],
  },
});
