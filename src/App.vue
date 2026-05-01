<script setup lang="ts">
import { defineAsyncComponent, hydrateOnInteraction } from "vue";

const TelLuck = defineAsyncComponent({
  loader: () => import("./components/tel-luck.vue"),
  hydrate: hydrateOnInteraction(["mouseenter"]),
});
</script>

<template>
  <TelLuck />
</template>
