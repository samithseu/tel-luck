<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from "vue";
import dataUrl from "../assets/data.json?url";

type LuckData = { short: string; long: string };

// Constants
const MOD_FACTOR = 80;
const MIN_PHONE_LENGTH = 6;

// shallowRef for performance
const list = shallowRef<LuckData[]>([]);
const phone = ref<string>("");
const isLoading = ref(true);
const error = ref<string | null>(null);

const luckResult = computed(() => {
  const rawPhone = phone.value.trim();

  if (rawPhone.length < MIN_PHONE_LENGTH || !list.value.length) return null;

  const lastSix = Number(rawPhone.slice(-6));
  if (isNaN(lastSix)) return null;

  // Simplified Math: ((x / 80) % 1) * 80 = x % 80
  const index = lastSix % MOD_FACTOR;

  // Ensure the index stays within bounds (1-80 mapping to 0-79)
  const lookupIndex = index === 0 ? MOD_FACTOR - 1 : index - 1;

  return list.value[lookupIndex] || "Data not found";
});

const classEN = computed(() => luckResult.value?.short || "");

onMounted(async () => {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error("Failed to fetch luck data");
    list.value = await response.json();
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Unknown error";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="wrapper" :style="`--result-clr:var(--color-${classEN});`">
    <h1>ទស្សន៍ទាយលេខទូរសព្ទ (Tel-Luck)</h1>

    <div v-if="isLoading">Loading data...</div>
    <div v-else-if="error">{{ error }}</div>

    <template v-else>
      <div class="phone-input">
        <input
          class="inline-full"
          autofocus
          v-model="phone"
          type="tel"
          inputmode="numeric"
          maxlength="11"
          placeholder="សូមបញ្ចូលលេខទូរសព្ទ (6 ខ្ទង់ឡើង)"
          aria-label="Phone number"
        />
      </div>

      <p class="output">
        លទ្ធផល:
        <output v-if="luckResult"
          >({{ luckResult.short }}) {{ luckResult.long }}</output
        >
        <output v-else>សូមបញ្ចូលលេខទូរសព្ទដែលមានយ៉ាងតិច 6 ខ្ទង់</output>
      </p>
    </template>

    <p class="reference">
      ក្បួនទស្សន៍ទាយ:
      <a
        href="https://komnotra.wordpress.com/fortune-tailer/phone-number-fortune/"
        >ប្រភព</a
      >
    </p>
  </div>
</template>

<style>
@reference "#style.css";

.wrapper {
  @apply border border-(--result-clr) p-6 max-inline-2xl flex flex-col items-center gap-4 transition-colors duration-200 bg-[hsl(from_var(--result-clr)_h_s_l/0.1)] rounded-xl;

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
      @apply text-(--result-clr) font-bold transition-colors duration-200;
    }
  }
}

.phone-input {
  & input {
    @apply inline-full border border-(--result-clr) p-2 rounded-lg text-center;

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
