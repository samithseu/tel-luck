<script setup lang="ts">
const {
  phoneInput,
  rawDigits,
  onlyCharLeft,
  lastSixDigits,
  luckResult,
  rating,
  themeColor,
  setSample,
  clear,
} = useTelLuck();

const copied = ref(false);

const copyResult = async () => {
  if (!luckResult.value) return;
  const text = `ទស្សន៍ទាយលេខទូរសព្ទ ${phoneInput.value}៖ (${luckResult.value.short}) ${luckResult.value.long}។ - គណនាតាម tel-luck.samith.dev`;
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    // clipboard write failed silently
  }
};

const ratingMeta: Record<
  string,
  { label: string; icon: string; badgeStyle: string }
> = {
  excellent: {
    label: "ល្អណាស់",
    icon: "tabler:sparkles",
    badgeStyle:
      "bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 border-emerald-500/40",
  },
  good: {
    label: "ល្អ",
    icon: "tabler:circle-check",
    badgeStyle:
      "bg-blue-500/15 text-blue-900 dark:text-blue-300 border-blue-500/40",
  },
  normal: {
    label: "ធម្មតា",
    icon: "tabler:scale",
    badgeStyle:
      "bg-stone-500/15 text-stone-900 dark:text-stone-200 border-stone-500/40",
  },
  bad: {
    label: "អាក្រក់",
    icon: "tabler:alert-triangle",
    badgeStyle:
      "bg-orange-500/15 text-orange-950 dark:text-orange-300 border-orange-500/40",
  },
  terrible: {
    label: "អាក្រក់ណាស់",
    icon: "tabler:alert-octagon",
    badgeStyle:
      "bg-red-500/15 text-red-950 dark:text-red-300 border-red-500/40",
  },
};
</script>

<template>
  <div class="w-full max-w-lg mx-auto flex flex-col items-center">
    <!-- Royal Stele Card (Clean, Minimal, Expensive) -->
    <article
      class="relative w-full rounded-3xl bg-surface dark:bg-surface/90 backdrop-blur-2xl p-6 sm:p-8 md:p-10 transition-all duration-700 overflow-hidden border border-border shadow-2xl shadow-stone-900/10 dark:shadow-black/70 ring-1 ring-black/4 dark:ring-white/6"
      :style="{
        '--result-clr': themeColor,
        boxShadow: luckResult
          ? '0 25px 60px -15px color-mix(in srgb, var(--result-clr) 18%, transparent), 0 0 0 1px color-mix(in srgb, var(--result-clr) 25%, transparent)'
          : undefined,
      }"
    >
      <!-- Subtle Ambient Colored Aura behind the card -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -top-32 -right-32 size-80 rounded-full blur-3xl transition-all duration-700"
        :style="{
          backgroundColor: themeColor,
          opacity: luckResult ? '0.12' : '0.03',
        }"
      />

      <!-- Header Section with Authentic Kbach Chan Medallion -->
      <header class="flex flex-col items-center text-center mb-6 sm:mb-8">
        <!-- Sacred Lotus Medallion with Subtle Radiant Glow -->
        <div class="relative mb-3 flex items-center justify-center">
          <!-- Soft Golden Halo -->
          <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 size-14 sm:size-16 rounded-2xl bg-amber-500/20 blur-lg"
          />
          <div
            class="relative size-14 sm:size-16 rounded-2xl bg-linear-to-br from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/40 p-2 flex items-center justify-center shadow-inner shadow-amber-500/10"
          >
            <KbachOrnament
              variant="medallion"
              class="size-10 sm:size-12 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]"
            />
          </div>
        </div>

        <h1
          class="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground font-sans"
        >
          ទស្សន៍ទាយលេខទូរសព្ទ
        </h1>
        <p class="text-xs sm:text-sm text-muted mt-1 font-medium tracking-wide">
          គណនាជោគជតាតាមក្បួនតម្រាបុរាណ ៨០ ខ្ទង់
        </p>
      </header>

      <!-- Input Field: Clean & High-End -->
      <div class="space-y-3 mb-6 sm:mb-8">
        <label for="phone-input" class="sr-only">លេខទូរសព្ទ</label>

        <div class="relative flex items-center">
          <input
            id="phone-input"
            v-model="phoneInput"
            v-maska="'### ### ### ##'"
            type="tel"
            inputmode="numeric"
            autocomplete="tel"
            maxlength="14"
            autofocus
            placeholder="012 345 678"
            aria-label="លេខទូរសព្ទ"
            aria-describedby="result-section"
            class="w-full h-14 sm:h-16 rounded-2xl border-2 bg-surface-muted/60 dark:bg-surface-muted/35 px-5 text-center text-xl sm:text-2xl font-bold tracking-widest text-foreground placeholder:text-subtle/50 placeholder:font-normal placeholder:tracking-normal focus:outline-none transition-all duration-300 shadow-inner"
            :class="[
              luckResult
                ? 'border-(--result-clr)/60 focus:border-(--result-clr) focus:ring-4 focus:ring-(--result-clr)/15 focus:shadow-[0_0_24px_-4px_color-mix(in_srgb,var(--result-clr)_25%,transparent)]'
                : 'border-border focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 focus:shadow-[0_0_24px_-4px_rgba(245,158,11,0.2)]',
            ]"
          />

          <!-- Quick Clear Button -->
          <button
            v-if="phoneInput"
            type="button"
            @click="clear"
            class="absolute right-3.5 size-8 inline-flex items-center justify-center rounded-full text-muted hover:text-foreground bg-surface hover:bg-surface-elevated border border-border/60 hover:border-border transition-colors focus:outline-none shadow-2xs"
            aria-label="លុបលេខចេញ"
            title="លុបចេញ"
          >
            <Icon name="tabler:x" class="size-4" />
          </button>
        </div>
      </div>

      <!-- Result Stage: Stable Fixed Height Container (Zero Layout Shift) -->
      <div
        id="result-section"
        class="min-h-55 sm:min-h-52.5 w-full flex items-center justify-center"
      >
        <transition
          mode="out-in"
          enter-active-class="transition duration-400 ease-out"
          enter-from-class="opacity-0 translate-y-3 scale-98"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 -translate-y-2 scale-98"
        >
          <!-- Active Fortune Result (Simple Card with Result Border Color) -->
          <div
            v-if="luckResult"
            key="result"
            class="w-full min-h-55 sm:min-h-52.5 rounded-2xl border border-(--result-clr)/60 bg-surface-muted/60 dark:bg-surface-muted/35 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 shadow-2xs"
          >
            <!-- Top Row: Gemstone Rating Badge & Numerology Number -->
            <div
              class="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-border/70 dark:border-border/50"
            >
              <!-- Status Badge (with small light glow only in dark mode) -->
              <div
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs sm:text-sm font-bold tracking-wide shadow-none dark:shadow-[0_0_12px_color-mix(in_srgb,var(--result-clr)_10%,transparent)] transition-all"
                :class="ratingMeta[rating]?.badgeStyle"
              >
                <Icon
                  :name="ratingMeta[rating]?.icon || 'tabler:sparkles'"
                  class="size-4"
                />
                <span>{{ luckResult.short }}</span>
              </div>

              <!-- Astrological Index Pill -->
              <div
                class="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-border bg-surface text-foreground shadow-2xs"
              >
                <span class="text-muted">លេខតម្រា៖</span>
                <span
                  class="text-(--result-clr) font-bold text-xs sm:text-sm"
                  >{{ luckResult.index }}</span
                >
                <span class="text-muted/70">/ 80</span>
              </div>
            </div>

            <!-- Fortune Prediction Text (Generous, High-Contrast Khmer Typography) -->
            <output
              aria-live="polite"
              class="block text-base sm:text-lg leading-[1.85] sm:leading-[1.95] text-foreground font-bold text-justify hyphens-auto tracking-normal my-auto"
            >
              {{ luckResult.long }}។
            </output>

            <!-- Bottom Meta Row: Math Proof & Copy Action -->
            <div
              class="mt-3.5 pt-3 border-t border-border/70 dark:border-border/50 flex items-center justify-between gap-2 text-xs text-muted"
            >
              <!-- Mathematical Proof Indicator -->
              <span
                class="inline-flex items-center gap-1.5 font-mono text-[11px] text-foreground/80 dark:text-muted"
              >
                <Icon name="tabler:calculator" class="size-3.5 text-muted" />
                <span class="hidden sm:inline">...</span
                ><span
                  >{{ lastSixDigits }} % 80 =
                  {{ parseInt(lastSixDigits) % 80 }}</span
                >
              </span>

              <!-- Copy Result Button -->
              <button
                type="button"
                @click="copyResult"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface hover:bg-surface-elevated hover:border-(--result-clr)/50 active:scale-95 transition-all text-foreground font-semibold text-xs shadow-2xs"
                :aria-label="copied ? 'បានចម្លងរួចរាល់' : 'ចម្លងលទ្ធផល'"
              >
                <Icon
                  :name="copied ? 'tabler:check' : 'tabler:copy'"
                  class="size-3.5"
                  :class="
                    copied
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-amber-600 dark:text-amber-400'
                  "
                />
                <span>{{ copied ? "បានចម្លង!" : "ចម្លងលទ្ធផល" }}</span>
              </button>
            </div>
          </div>

          <!-- When Digits < 6 (Default Border Color) -->
          <div
            v-else
            key="countdown"
            class="w-full min-h-55 sm:min-h-52.5 rounded-2xl border border-border bg-surface-muted/60 dark:bg-surface-muted/35 p-5 sm:p-6 text-center transition-all duration-300 flex flex-col items-center justify-center shadow-2xs gap-4"
          >
            <div
              class="inline-flex items-center gap-1.5 text-xs sm:text-sm text-foreground/85 dark:text-muted font-medium"
            >
              <Icon
                name="tabler:info-circle"
                class="size-4 text-amber-500 shrink-0"
              />
              <span>
                សូមបញ្ចូលយ៉ាងហោចណាស់
                <strong class="text-foreground">៦ ខ្ទង់</strong>
                (ខ្វះតែ
                <span
                  class="font-bold text-amber-600 dark:text-amber-400 text-sm sm:text-base"
                >
                  {{ onlyCharLeft }}
                </span>
                ខ្ទង់ទៀត)
              </span>
            </div>

            <!-- Gem-like Progress Dots -->
            <div class="flex items-center justify-center gap-2">
              <span
                v-for="i in 6"
                :key="i"
                class="size-2.5 rounded-full transition-all duration-400"
                :class="[
                  rawDigits.length >= i
                    ? 'bg-linear-to-tr from-amber-500 to-amber-300 scale-125 shadow-[0_0_8px_rgba(245,158,11,0.55)]'
                    : 'bg-border dark:bg-border/60',
                ]"
              />
            </div>
          </div>
        </transition>
      </div>
    </article>

    <!-- Luxury Minimal Legend: 5 Status Levels -->
    <nav
      aria-label="កម្រិតជោគជតានិងពណ៌"
      class="w-full max-w-lg mt-5 px-3 sm:px-6"
    >
      <div
        class="flex items-center justify-between gap-1 text-[11px] sm:text-xs text-foreground/80 dark:text-muted font-semibold"
      >
        <span class="flex items-center gap-1.5">
          <span
            class="size-2 rounded-full bg-emerald-500 ring-1 ring-black/15 dark:ring-white/20 shadow-sm shadow-emerald-500/30"
          />
          <span>ល្អណាស់</span>
        </span>
        <span class="flex items-center gap-1.5">
          <span
            class="size-2 rounded-full bg-blue-500 ring-1 ring-black/15 dark:ring-white/20 shadow-sm shadow-blue-500/30"
          />
          <span>ល្អ</span>
        </span>
        <span class="flex items-center gap-1.5">
          <span
            class="size-2 rounded-full bg-stone-400 ring-1 ring-black/15 dark:ring-white/20 shadow-sm shadow-stone-400/30"
          />
          <span>ធម្មតា</span>
        </span>
        <span class="flex items-center gap-1.5">
          <span
            class="size-2 rounded-full bg-orange-500 ring-1 ring-black/15 dark:ring-white/20 shadow-sm shadow-orange-500/30"
          />
          <span>អាក្រក់</span>
        </span>
        <span class="flex items-center gap-1.5">
          <span
            class="size-2 rounded-full bg-red-500 ring-1 ring-black/15 dark:ring-white/20 shadow-sm shadow-red-500/30"
          />
          <span>អាក្រក់ណាស់</span>
        </span>
      </div>
    </nav>
  </div>
</template>
