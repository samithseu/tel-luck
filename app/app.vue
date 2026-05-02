<script setup lang="ts">
const title = "Telephone Luck - Phone number fortune teller";
const desc =
  "Telephone Luck is a website that tells you the fortune of a phone number.";
const url = "https://samithseu.github.io/tel-luck/";

useHead({
  link: [
    { rel: "icon", type: "image/svg+xml", href: "https://fav.farm/teller" },
  ],
});

useSeoMeta({
  charset: "utf-8",
  title: title,
  description: desc,
  author: "Samith Seu",
  twitterTitle: title,
  twitterDescription: desc,
  twitterSite: "@samithseu",
  ogTitle: title,
  ogSiteName: "Tel-Luck",
  ogDescription: desc,
  ogUrl: url,
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
