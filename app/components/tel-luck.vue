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
      <div class="title">
        <Icon name="tabler:sparkles" />
        <h1>ទស្សន៍ទាយលេខទូរសព្ទ</h1>
      </div>
      <div class="subtitle">
        <p>
          <span>ជាមួយនឹងល្បឿនលឿនបំផុត</span>
          <Icon name="tabler:bolt" />
        </p>
        <NuxtLink
          external
          to="https://komnotra.wordpress.com/fortune-tailer/phone-number-fortune/"
          target="_blank"
          title="ក្បួនទស្សន៍ទាយ"
          >ក្បួនទស្សន៍ទាយ
          <Icon name="tabler:link" />
        </NuxtLink>
      </div>
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
        អ្នកនឹងឃើញជោគជតារបស់អ្នក!</output
      >
    </div>
  </article>
</template>

<style>
@reference "#main.css";

@utility preferred-padding {
  @apply p-2 md:p-2.5 lg:p-3.5;
}
@utility preferred-gap {
  @apply gap-2 md:gap-2.5;
}
@utility preferred-border-color {
  @apply border-(--clr)/50;
}
@utility preferred-duration {
  @apply duration-200;
}

.card {
  :has(> &) {
    @apply content-center min-block-svh;
  }

  @apply max-width-px-6 border-2 border-foreground/40 rounded-md md:rounded-lg lg:rounded-xl overflow-hidden [anchor-name:--card] bg-background shadow-(--clr) md:shadow-md;

  &[data-has-result="true"] {
    @apply preferred-border-color;
  }

  & .card-header {
    @apply inline-full border-b-2 border-foreground/40 preferred-padding flex flex-col justify-center items-center preferred-gap *:text-primary;

    :has([data-has-result="true"]) & {
      @apply *:text-(--clr) preferred-border-color;
    }

    & .title {
      @apply flex justify-center items-center preferred-gap;

      & .iconify {
        @apply text-xl md:text-3xl;
      }

      & h1 {
        @apply text-lg md:text-xl lg:text-2xl text-center font-bold;
      }
    }

    & .subtitle {
      @apply flex flex-wrap justify-center items-center preferred-gap *:text-center;

      & > * {
        @apply text-sm md:text-base font-medium flex justify-center gap-0.5 items-center text-foreground text-center;

        :has([data-has-result="true"]) & {
          @apply text-(--clr);
        }
      }

      & a {
        @apply absolute [position-anchor:--card] bottom-[anchor(top)] right-[anchor(98%)] px-2 border-2 rounded-full translate-y-1/2 bg-background border-foreground/40 text-foreground transition-colors preferred-duration hover:bg-foreground hover:text-background;

        :has([data-has-result="true"]) & {
          @apply preferred-border-color hover:bg-(--clr);
        }
      }
    }
  }

  & .card-body {
    & .phone-input {
      @apply inline-full;

      & input {
        @apply inline-full preferred-padding text-center font-semibold text-base md:text-lg leading-relaxed;

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
      @apply *:text-(--clr) preferred-border-color;
    }

    & > * {
      @apply preferred-padding text-(--clr);
    }

    & .result-label {
      @apply border-r-2 border-foreground/40 font-semibold flex items-center gap-1.5;

      :has([data-has-result="true"]) & {
        @apply *:text-(--clr) preferred-border-color;
      }

      & > * {
        @apply text-foreground;
      }

      & span {
        @apply text-base md:text-lg;
      }
    }

    & output {
      @apply transition-colors text-justify preferred-duration text-wrap text-base md:text-lg;

      :has([data-has-result="false"]) & {
        @apply font-medium text-foreground italic;
      }
      :has([data-has-result="true"]) & {
        @apply text-(--clr) font-semibold;
      }
    }
  }

  &::before {
    @apply absolute content-[''] inline-full block-full top-0 left-0 -z-1 inset-shadow-[0_0_2rem_0rem_var(--clr)] sm:inset-shadow-[0_0_4rem_0rem_var(--clr)] md:inset-shadow-[0_0_5rem_0rem_var(--clr)] lg:inset-shadow-[0_0_6rem_0rem_var(--clr)] transition-shadow preferred-duration;
  }
}
</style>
