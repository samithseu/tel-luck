<script setup lang="ts">
const siteUrl = "https://tel-luck.samith.dev";
const title = "Telephone Luck - ទស្សន៍ទាយលេខទូរសព្ទ";
const desc =
  "ទស្សន៍ទាយលេខទូរសព្ទតាមក្បួនតម្រាបុរាណ ៨០ ខ្ទង់ - Phone number numerology with instant calculation.";
const authorDesc = "A web developer and lifelong learner.";
const authorAltNames = [
  "Seu Samith",
  "Samith Seu",
  "samithseu",
  "seusamith",
  "seumith",
  "ស៊ឺ សាមីត",
];
const authorSocial = [
  "https://samith.dev",
  "https://github.com/samithseu",
  "https://linkedin.com/in/samith-seu/",
  "https://x.com/seumith",
  "https://t.me/samithseu",
];

const seoForGoogle = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": `${siteUrl}/#website`,
      "@type": "WebSite",
      inLanguage: "km",
      name: "tel-luck",
      url: siteUrl,
    },
    {
      "@id": `${siteUrl}/#/`,
      "@type": "WebPage",
      description: desc,
      inLanguage: "km-KH",
      name: "Home",
      url: `${siteUrl}/`,
      author: {
        "@type": "Person",
        "@id": "https://samith.dev",
        url: "https://samith.dev",
        name: "Samith Seu",
        description: authorDesc,
        alternateName: authorAltNames,
        sameAs: authorSocial,
      },
      isPartOf: { "@id": `${siteUrl}/#website` },
      keywords: [
        "លេខទូរសព្ទ",
        "ទស្សន៍ទាយលេខទូរសព្ទ",
        "ទស្សន៍ទាយ",
        "tel-luck",
        "Tel-Luck",
        "Telephone Luck",
        "Phone number fortune teller",
        "Fortune Teller",
        "Fortune Telling",
        "Numerology",
      ],
      potentialAction: {
        "@type": "ReadAction",
        target: [siteUrl],
      },
    },
    {
      "@id": "https://samith.dev",
      "@type": "Person",
      description: authorDesc,
      name: "Samith Seu",
      url: "https://samith.dev",
      alternateName: authorAltNames,
      sameAs: authorSocial,
    },
  ],
};

useHead({
  htmlAttrs: {
    lang: "km",
  },
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "alternate icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "canonical", href: siteUrl },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(seoForGoogle),
    },
  ],
});

useSeoMeta({
  title,
  description: desc,
  author: "Samith Seu",
  ogTitle: title,
  ogDescription: desc,
  ogUrl: siteUrl,
  ogSiteName: "Tel-Luck",
  ogType: "website",
  twitterTitle: title,
  twitterDescription: desc,
  twitterSite: "@samithseu",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
