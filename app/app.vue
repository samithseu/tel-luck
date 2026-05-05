<script setup lang="ts">
import favicon from "/favicon.ico";

const title = "Telephone Luck - Phone number fortune teller";
const desc =
  "Telephone Luck is a website that tells you the fortune of a phone number.";
const url = "https://samithseu.github.io/tel-luck";

const seoForGoogle = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": `${url}/#website`,
      "@type": "WebSite",
      inLanguage: "en",
      name: "tel-luck",
      url: `${url}`,
    },
    {
      "@id": `${url}/#/`,
      "@type": "WebPage",
      description: desc,
      inLanguage: "en-US",
      name: "Home",
      url: "/",
      author: {
        "@type": "Person",
        "@id": "samith.dev",
        url: "https://samith.dev",
        name: "Samith Seu",
        description: "A web developer and lifelong learner.",
        alternateName: [
          "Seu Samith",
          "Samith Seu",
          "samithseu",
          "seusamith",
          "seumith",
          "ស៊ឺ សាមីត",
        ],
        sameAs: [
          "https://samithseu.vercel.app",
          "https://github.com/samithseu",
          "https://linkedin.com/in/samith-seu/",
          "https://x.com/seumith",
          "https://t.me/samithseu",
        ],
      },
      isPartOf: { "@id": `${url}/#website` },
      keywords: [
        "ទស្សន៍ទាយលេខទូរសព្ទ",
        "ទស្សន៍ទាយ",
        "tel-luck",
        "Tel-Luck",
        "Telephone Luck",
        "Phone number fortune teller",
        "Fortune Teller",
        "Numerology",
      ],
      potentialAction: {
        "@type": "ReadAction",
        target: [url, "/"],
      },
    },
    {
      "@id": "https://samith.dev",
      "@type": "Person",
      description: "A web developer and lifelong learner.",
      name: "Samith Seu",
      url: "https://samith.dev",
      alternateName: [
        "Seu Samith",
        "Samith Seu",
        "samithseu",
        "seusamith",
        "seumith",
        "ស៊ឺ សាមីត",
      ],
      sameAs: [
        "https://github.com/samithseu",
        "https://linkedin.com/in/samith-seu/",
        "https://x.com/seumith",
        "https://t.me/samithseu",
      ],
    },
  ],
};

useHead({
  link: [{ rel: "icon", type: "image/svg+xml", href: favicon }],
  script: [
    { type: "application/ld+json", textContent: JSON.stringify(seoForGoogle) },
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
