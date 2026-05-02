<script setup lang="ts">
const { asyncData, phoneInput, luckResult, className, onlyCharLeft } =
  useTelLuck();
await asyncData;
</script>

<template>
  <article
    class="card"
    :data-has-result="!!luckResult"
    :style="`--clr:var(--color-${className});`"
  >
    <div class="card-header">
      <Icon name="tabler:sparkles" />
      <h1>ទស្សន៍ទាយលេខទូរសព្ទ</h1>
    </div>

    <div class="card-body">
      <div class="phone-input">
        <input
          class="inline-full"
          autofocus
          v-model="phoneInput"
          type="tel"
          inputmode="numeric"
          maxlength="11"
          placeholder="សូមបញ្ចូលលេខទូរសព្ទដើម្បីទស្សន៍ទាយ (ឧ. 012 345 678)"
          aria-label="Phone number"
          @input="phoneInput = phoneInput.replace(/[^0-9]/g, '')"
        />
      </div>
    </div>

    <div class="card-footer">
      <div class="result-label">
        <Icon name="tabler:text-scan-2" />
        <span>លទ្ធផល</span>
      </div>

      <output v-if="luckResult"
        >({{ luckResult.short }}) {{ luckResult.long }}</output
      >
      <output v-else
        >ខ្វះតែលេខទូរសព្ទ <span>{{ onlyCharLeft }}</span> ខ្ទង់
        អ្នកនឹងឃើញលទ្ធផល!</output
      >
    </div>
  </article>
</template>

<style>
@reference "#main.css";

.card {
  :has(> &) {
    @apply content-center min-block-svh;
  }

  @apply max-width-px-6 border-2 border-foreground/40 rounded-md md:rounded-lg lg:rounded-xl overflow-hidden;

  &[data-has-result="true"] {
    @apply border-(--clr)/40;
  }

  & .card-header {
    @apply inline-full border-b-2 border-foreground/40 p-1.5 md:p-2 lg:p-3 flex justify-center items-center gap-1.5 md:gap-2 *:text-primary;

    :has([data-has-result="true"]) & {
      @apply *:text-(--clr) border-(--clr)/40;
    }

    & .iconify {
      @apply text-xl md:text-3xl;
    }

    & h1 {
      @apply text-lg md:text-xl lg:text-2xl text-center font-bold;
    }
  }

  & .card-body {
    & .phone-input {
      @apply inline-full;

      & input {
        @apply inline-full p-1.5 md:p-2 lg:p-3 text-center font-semibold text-base md:text-lg;

        &:not(:placeholder-shown) {
          @apply text-primary;
        }

        &:focus-visible {
          @apply outline outline-(--clr);
        }
      }
    }
  }

  & .card-footer {
    @apply inline-full border-t-2 border-foreground/40 grid grid-cols-[auto_1fr];

    :has([data-has-result="true"]) & {
      @apply *:text-(--clr) border-(--clr)/40;
    }

    & > * {
      @apply p-1.5 md:p-2 lg:p-3 text-(--clr);
    }

    & .result-label {
      @apply border-r-2 border-foreground/40 font-semibold flex items-center gap-1.5;

      :has([data-has-result="true"]) & {
        @apply *:text-(--clr) border-(--clr)/40;
      }

      & > * {
        @apply text-foreground;
      }

      & span {
        @apply text-base md:text-lg;
      }
    }

    & output {
      @apply transition-colors text-justify duration-200 text-wrap text-base md:text-lg;

      :has([data-has-result="false"]) & {
        @apply font-medium text-foreground italic;
      }
      :has([data-has-result="true"]) & {
        @apply text-(--clr) font-semibold;
      }
    }
  }

  &::before {
    @apply absolute content-[''] inline-full block-full top-0 left-0 -z-1 inset-shadow-[0_0_2rem_0rem_var(--clr)] sm:inset-shadow-[0_0_4rem_0rem_var(--clr)] md:inset-shadow-[0_0_5rem_0rem_var(--clr)] lg:inset-shadow-[0_0_6rem_0rem_var(--clr)] transition-shadow duration-300;
  }
}
</style>
