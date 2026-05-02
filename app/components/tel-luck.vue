<script setup lang="ts">
const { asyncData, phoneInput, luckResult, className, onlyCharLeft } =
  useTelLuck();
await asyncData;
</script>

<template>
  <div class="wrapper" :style="`--result-clr:var(--color-${className});`">
    <h1>ទស្សន៍ទាយលេខទូរសព្ទ (Tel-Luck)</h1>

    <div class="phone-input">
      <input
        class="inline-full"
        autofocus
        v-model="phoneInput"
        type="tel"
        inputmode="numeric"
        maxlength="11"
        placeholder="សូមបញ្ចូលលេខទូរសព្ទ (ឧ. 012 345 678)"
        aria-label="Phone number"
        @input="phoneInput = phoneInput.replace(/[^0-9]/g, '')"
      />
    </div>

    <p class="output">
      លទ្ធផល:
      <output v-if="luckResult"
        >({{ luckResult.short }}) {{ luckResult.long }}</output
      >
      <output v-else
        >ខ្វះតែលេខទូរសព្ទ
        <span class="font-bold">{{ onlyCharLeft }}</span> ខ្ទង់
        អ្នកនឹងឃើញលទ្ធផល!</output
      >
    </p>

    <p class="reference">
      ក្បួនទស្សន៍ទាយ:
      <NuxtLink
        external
        target="_blank"
        to="https://komnotra.wordpress.com/fortune-tailer/phone-number-fortune/"
        >ប្រភព</NuxtLink
      >
    </p>
  </div>
</template>

<style>
@reference "#main.css";

.wrapper {
  @apply border border-(--result-clr) p-6 max-inline-2xl flex flex-col items-center gap-4 transition-[colors,max-inline-size] duration-200 bg-[hsl(from_var(--result-clr)_h_s_l/0.1)] rounded-xl;

  :has(> &) {
    @apply grid place-items-center min-h-svh;
  }

  &::before {
    @apply absolute content-[''] w-full h-full top-0 left-0 -z-1 inset-shadow-[0_0_5rem_0rem_var(--result-clr)] transition-shadow duration-300;
  }

  & h1 {
    @apply text-2xl text-center font-bold text-primary;
  }

  & .output {
    @apply text-center;
    & > output {
      @apply text-(--result-clr) font-semibold transition-colors duration-200;
    }
  }
}

.phone-input {
  @apply inline-full;
  & input {
    @apply w-full border border-(--result-clr) p-2 rounded-lg text-center;

    &:focus-visible {
      @apply outline outline-(--result-clr);
    }
  }
}

.reference {
  & a {
    @apply underline text-primary font-semibold;
  }
}
</style>
