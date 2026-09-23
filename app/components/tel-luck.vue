<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";

const {
  phoneInput,
  rawDigits,
  onlyCharLeft,
  lastSixDigits,
  luckResult,
  rating,
  themeColor,
  isCommandPaletteOpen,
  isAboutOpen,
  isMoreMenuOpen,
  isMinimized,
  isMaximized,
  copied,
  ratingMeta,
  copyResult,
  clear,
} = useTelLuck();

const moreMenuRef = ref<HTMLElement | null>(null);

// Smooth height transition references
const sectionInnerRef = ref<HTMLElement | null>(null);
const sectionHeight = ref<number | null>(null);
let resizeObserver: ResizeObserver | null = null;
let rAF: number | null = null;

const updateHeight = () => {
  if (rAF !== null && typeof cancelAnimationFrame !== "undefined") {
    cancelAnimationFrame(rAF);
  }
  if (typeof requestAnimationFrame !== "undefined") {
    rAF = requestAnimationFrame(() => {
      if (sectionInnerRef.value) {
        const h = sectionInnerRef.value.offsetHeight;
        if (h > 0 && h !== sectionHeight.value) {
          sectionHeight.value = h;
        }
      }
    });
  } else if (sectionInnerRef.value) {
    const h = sectionInnerRef.value.offsetHeight;
    if (h > 0) {
      sectionHeight.value = h;
    }
  }
};

const toggleMoreMenu = () => {
  isMoreMenuOpen.value = !isMoreMenuOpen.value;
};

const closeMoreMenu = () => {
  isMoreMenuOpen.value = false;
};

const handleWindowClose = () => {
  if (isCommandPaletteOpen.value) {
    isCommandPaletteOpen.value = false;
    return;
  }
  if (isMoreMenuOpen.value) {
    isMoreMenuOpen.value = false;
    return;
  }
  if (isAboutOpen.value) {
    isAboutOpen.value = false;
    return;
  }
  if (phoneInput.value) {
    clear();
  }
};

const hasOpenedPalette = ref(false);
const hasOpenedAbout = ref(false);

watch(isCommandPaletteOpen, (open) => {
  if (open) {
    hasOpenedPalette.value = true;
  } else if (!isAboutOpen.value) {
    nextTick(() => {
      document.getElementById("phone-input")?.focus();
    });
  }
});

watch(isAboutOpen, (open) => {
  if (open) {
    hasOpenedAbout.value = true;
  } else if (!isCommandPaletteOpen.value) {
    nextTick(() => {
      document.getElementById("phone-input")?.focus();
    });
  }
});

const handleClickOutside = (e: MouseEvent) => {
  if (
    isMoreMenuOpen.value &&
    moreMenuRef.value &&
    !moreMenuRef.value.contains(e.target as Node)
  ) {
    isMoreMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  nextTick(() => {
    updateHeight();
    if (typeof ResizeObserver !== "undefined" && sectionInnerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });
      resizeObserver.observe(sectionInnerRef.value);
    }
  });
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  if (rAF !== null && typeof cancelAnimationFrame !== "undefined") {
    cancelAnimationFrame(rAF);
    rAF = null;
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
</script>

<template>
  <div
    class="w-full transition-all duration-300 ease-out flex flex-col items-center select-none"
    :class="[isMaximized ? 'max-w-2xl' : 'max-w-xl']"
  >
    <!-- ============================================================== -->
    <!-- Minimized macOS Dock Pill Mode                                 -->
    <!-- ============================================================== -->
    <div
      v-if="isMinimized"
      class="w-full max-w-sm rounded-2xl bg-surface/90 dark:bg-[#18181b]/90 border border-border/80 dark:border-white/10 p-3 shadow-2xl backdrop-blur-2xl flex items-center justify-between gap-3 animate-in zoom-in-95 duration-200"
    >
      <div class="flex items-center gap-2.5">
        <MacTrafficLights
          :is-minimized="isMinimized"
          :is-maximized="isMaximized"
          @close="handleWindowClose"
          @minimize="isMinimized = false"
          @maximize="isMaximized = !isMaximized"
        />
        <div class="h-4 w-px bg-border/80 mx-1" />
        <span
          class="text-xs font-semibold text-foreground/80 font-sans tracking-tight"
          >tel-luck</span
        >
      </div>

      <button
        type="button"
        @click="isMinimized = false"
        class="px-2.5 py-1 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-400 active:scale-95 transition-all shadow-2xs inline-flex items-center gap-1"
      >
        <Icon name="tabler:arrows-maximize" class="size-3" />
        <span>ពង្រីកមកវិញ</span>
      </button>
    </div>

    <!-- ============================================================== -->
    <!-- Primary macOS Window Frame (Dynamic Auto-Height, Smooth Ease)  -->
    <!-- ============================================================== -->
    <article
      v-else
      class="relative w-full h-auto rounded-3xl bg-surface/90 dark:bg-[#141418]/90 backdrop-blur-2xl sm:backdrop-blur-3xl border border-border/80 dark:border-white/10 transition-[height,box-shadow,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ring-1 ring-black/5 dark:ring-white/10 flex flex-col"
      :style="{
        '--result-clr': themeColor,
        boxShadow: luckResult
          ? '0 30px 80px -15px color-mix(in srgb, var(--result-clr) 22%, transparent), 0 0 0 1px color-mix(in srgb, var(--result-clr) 25%, transparent)'
          : '0 25px 70px -15px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
      }"
    >
      <!-- Ambient Colored Aura within the Window -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -top-32 -right-32 size-80 rounded-full blur-3xl transition-all duration-700"
        :style="{
          backgroundColor: themeColor,
          opacity: luckResult ? '0.14' : '0.04',
        }"
      />

      <!-- ============================================================ -->
      <!-- macOS Window Titlebar (Clean, Single Purpose, No Redundancy) -->
      <!-- ============================================================ -->
      <header
        class="relative h-11 sm:h-12 px-4 sm:px-5 flex items-center justify-between border-b border-border/80 dark:border-white/8 bg-surface-muted/35 dark:bg-white/2 shrink-0 z-20"
      >
        <!-- Left Section: Traffic Lights -->
        <div class="flex items-center gap-3">
          <MacTrafficLights
            :is-minimized="isMinimized"
            :is-maximized="isMaximized"
            @close="handleWindowClose"
            @minimize="isMinimized = true"
            @maximize="isMaximized = !isMaximized"
          />
        </div>

        <!-- Center: Pure Window Title (macOS HIG: Clean Typography, No Double Logo) -->
        <div class="flex items-center gap-1.5 select-none pointer-events-none">
          <span
            class="text-xs font-semibold tracking-tight text-foreground/85 dark:text-foreground/75 font-sans"
          >
            Telephone Luck
          </span>
          <span
            class="px-1 py-0.2 rounded text-[9px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-mono"
          >
            80
          </span>
        </div>

        <!-- Right Section: Raycast-Crafted Three-Dots Action Menu Button -->
        <div ref="moreMenuRef" class="relative">
          <button
            type="button"
            @click="toggleMoreMenu"
            class="group relative size-7.5 rounded-lg border border-border/80 dark:border-white/8 bg-surface-muted/50 hover:bg-surface-muted/80 dark:bg-white/5 dark:hover:bg-white/1 text-muted hover:text-foreground transition-all duration-150 inline-flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] active:scale-[0.93] focus:outline-none"
            title="ម៉ឺនុយបញ្ជា (Menu)"
            aria-label="Open menu"
          >
            <Icon
              name="tabler:dots"
              class="size-4 text-foreground/75 group-hover:text-foreground transition-colors"
            />
          </button>

          <!-- Raycast Floating Popover Menu -->
          <transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isMoreMenuOpen"
              class="absolute right-0 mt-1.5 w-52 rounded-2xl bg-surface/95 dark:bg-[#16161a]/95 border border-border/80 dark:border-white/10 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-2xl z-50 text-xs font-semibold space-y-0.5 ring-1 ring-black/5 dark:ring-white/10"
            >
              <button
                type="button"
                @click="
                  isCommandPaletteOpen = true;
                  closeMoreMenu();
                "
                class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-foreground hover:bg-surface-muted dark:hover:bg-white/8 transition-colors text-left"
              >
                <span class="flex items-center gap-2">
                  <Icon name="tabler:command" class="size-3.5 text-amber-500" />
                  <span>ផ្ទាំងបញ្ជា</span>
                </span>
                <kbd
                  class="px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-muted inline-flex items-center gap-0.5 [&_span]:trim-both"
                >
                  <Icon name="tabler:command" class="size-[1.2em] shrink-0" />
                  <span>K</span>
                </kbd>
              </button>

              <NuxtLink
                to="https://komnotra.wordpress.com/fortune-tailer/phone-number-fortune/"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeMoreMenu"
                class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-foreground hover:bg-surface-muted dark:hover:bg-white/8 transition-colors"
              >
                <span class="flex items-center gap-2">
                  <Icon
                    name="tabler:external-link"
                    class="size-3.5 text-emerald-500"
                  />
                  <span>ក្បួនតម្រា Komnotra</span>
                </span>
                <Icon name="tabler:arrow-up-right" class="size-3 text-muted" />
              </NuxtLink>

              <NuxtLink
                to="https://github.com/samithseu/tel-luck"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeMoreMenu"
                class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-foreground hover:bg-surface-muted dark:hover:bg-white/8 transition-colors"
              >
                <span class="flex items-center gap-2">
                  <Icon
                    name="tabler:brand-github"
                    class="size-3.5 text-muted"
                  />
                  <span>កូដលើ GitHub</span>
                </span>
                <Icon name="tabler:arrow-up-right" class="size-3 text-muted" />
              </NuxtLink>

              <div class="h-px bg-border/60 dark:bg-white/10 my-1" />

              <button
                type="button"
                @click="
                  isAboutOpen = true;
                  closeMoreMenu();
                "
                class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-foreground hover:bg-surface-muted dark:hover:bg-white/8 transition-colors text-left"
              >
                <Icon
                  name="tabler:info-circle"
                  class="size-3.5 text-purple-500"
                />
                <span>អំពី tel-luck (About)</span>
              </button>

              <button
                v-if="phoneInput"
                type="button"
                @click="
                  clear();
                  closeMoreMenu();
                "
                class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors text-left"
              >
                <span class="flex items-center gap-2">
                  <Icon name="tabler:x" class="size-3.5" />
                  <span>សម្អាតលេខចេញ</span>
                </span>
                <kbd
                  class="px-1.5 py-1 rounded-sm text-[10px] font-mono font-bold bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-muted trim-both"
                >
                  Esc
                </kbd>
              </button>
            </div>
          </transition>
        </div>
      </header>

      <!-- ============================================================ -->
      <!-- Window Body Area (Dynamic Height, Natural Flow, No Samples)  -->
      <!-- ============================================================ -->
      <div
        class="w-full px-5 sm:px-8 py-5 sm:py-6 flex flex-col gap-4 sm:gap-5"
      >
        <!-- Hero Section with the Sacred Lotus Seal as Central Visual Mark -->
        <div class="flex flex-col items-center text-center">
          <div class="relative mb-2.5 flex items-center justify-center">
            <div
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 size-12 rounded-2xl bg-amber-500/20 blur-sm"
            />
            <div
              class="relative size-12 rounded-2xl bg-linear-to-br from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 p-2 flex items-center justify-center shadow-inner shadow-amber-500/10"
            >
              <KbachOrnament
                variant="medallion"
                class="size-8.5 drop-shadow-[0_2px_6px_rgba(245,158,11,0.25)]"
              />
            </div>
          </div>

          <h1
            class="text-lg sm:text-xl font-bold tracking-tight text-foreground font-sans"
          >
            ទស្សន៍ទាយលេខទូរសព្ទ
          </h1>
          <p
            class="text-[11px] sm:text-xs text-muted mt-0.5 font-medium tracking-wide"
          >
            គណនាជោគជតាតាមក្បួនតម្រាបុរាណខ្មែរ 80 ខ្ទង់
          </p>
        </div>

        <!-- ========================================================== -->
        <!-- Interactive Stage: Input & Result Align to EXACT SAME WIDTH-->
        <!-- ========================================================== -->
        <div class="w-full max-w-lg mx-auto flex flex-col gap-3">
          <!-- Phone Input Field (Matches Result Card in Width, Radius & Border Thickness) -->
          <div class="relative flex items-center w-full">
            <label for="phone-input" class="sr-only">លេខទូរសព្ទ</label>

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
              class="w-full h-13 sm:h-14 rounded-2xl border border-border/80 dark:border-white/10 bg-surface-muted/60 dark:bg-surface-muted/30 px-5 text-center text-lg sm:text-xl font-bold tracking-widest text-foreground placeholder:text-subtle/50 placeholder:font-normal placeholder:tracking-normal focus:outline-none transition-all duration-300 shadow-inner"
              :class="[
                luckResult
                  ? 'border-(--result-clr)/60 focus:border-(--result-clr) focus:ring-2 focus:ring-(--result-clr)/20'
                  : 'focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20',
              ]"
            />

            <!-- Clear Button -->
            <button
              v-if="phoneInput"
              type="button"
              @click="clear"
              class="absolute right-3.5 size-7 inline-flex items-center justify-center rounded-full text-muted hover:text-foreground bg-surface hover:bg-surface-elevated border border-border/60 transition-colors focus:outline-none shadow-2xs"
              aria-label="លុបលេខចេញ"
              title="លុបចេញ (Esc)"
            >
              <Icon name="tabler:x" class="size-3.5" />
            </button>
          </div>

          <!-- Result Container with Fluid Dynamic Height Transition -->
          <div
            class="w-full overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            :style="{
              height: sectionHeight ? `${sectionHeight}px` : 'auto',
            }"
          >
            <div ref="sectionInnerRef" class="w-full">
              <transition
                mode="out-in"
                enter-active-class="transition-opacity duration-250 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-150 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <!-- Active Result Box: Natural Content Height & Generous Wrap -->
                <div
                  v-if="luckResult"
                  key="result"
                  class="w-full rounded-2xl border border-(--result-clr)/60 bg-surface-muted/60 dark:bg-surface-muted/30 backdrop-blur-xl p-4 sm:p-5 flex flex-col justify-between gap-3 shadow-2xs"
                >
                  <!-- Top Row: Rating Badge & Astrological Index -->
                  <div
                    class="flex items-center justify-between gap-2 pb-2.5 border-b border-border/70 dark:border-border/50 shrink-0"
                  >
                    <div
                      class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-bold tracking-wide"
                      :class="ratingMeta[rating]?.badgeStyle"
                    >
                      <Icon
                        :name="ratingMeta[rating]?.icon || 'tabler:sparkles'"
                        class="size-3.5"
                      />
                      <span>{{ luckResult.short }}</span>
                    </div>

                    <div
                      class="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-border/80 dark:border-white/10 bg-surface text-foreground shadow-2xs"
                    >
                      <span class="text-muted">លេខតម្រា៖</span>
                      <span class="text-(--result-clr) font-bold">
                        #{{ luckResult.index.toString().padStart(2, "0") }}
                      </span>
                      <span class="text-muted/60">/ 80</span>
                    </div>
                  </div>

                  <!-- Prediction Text: Cleanly Wrappable Without Overflowing -->
                  <output
                    aria-live="polite"
                    class="block text-sm sm:text-base leading-relaxed text-foreground font-bold text-justify hyphens-auto tracking-normal select-text py-1"
                  >
                    {{ luckResult.long }}។
                  </output>

                  <!-- Bottom Row: Formula Proof + Copy Action -->
                  <div
                    class="pt-2.5 border-t border-border/70 dark:border-border/50 flex items-center justify-between gap-2 text-xs text-muted shrink-0"
                  >
                    <span
                      class="inline-flex items-center gap-1 font-mono text-[11px] text-foreground/80 dark:text-muted"
                    >
                      <Icon
                        name="tabler:calculator"
                        class="size-3 text-muted"
                      />
                      <span
                        >{{ lastSixDigits }} % 80 =
                        {{ parseInt(lastSixDigits) % 80 }}</span
                      >
                    </span>

                    <button
                      type="button"
                      @click="copyResult"
                      class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/80 dark:border-white/10 bg-surface hover:bg-surface-elevated hover:border-(--result-clr)/50 active:scale-95 transition-all text-foreground font-semibold text-[11px] shadow-2xs"
                      :aria-label="copied ? 'បានចម្លងរួចរាល់' : 'ចម្លងលទ្ធផល'"
                    >
                      <Icon
                        :name="copied ? 'tabler:check' : 'tabler:copy'"
                        class="size-3"
                        :class="
                          copied
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-amber-600 dark:text-amber-400'
                        "
                      />
                      <span v-if="copied">បានចម្លង!</span>
                      <span
                        v-else
                        class="inline-flex items-center gap-0.5 *:trim-both"
                      >
                        <span>ចម្លង (</span>
                        <Icon
                          name="tabler:command"
                          class="size-[1.2em] shrink-0"
                        />
                        <span>C)</span>
                      </span>
                    </button>
                  </div>
                </div>

                <!-- Inactive Countdown State -->
                <div
                  v-else
                  key="countdown"
                  class="w-full py-8 px-4 rounded-2xl border border-border/80 dark:border-white/10 bg-surface-muted/60 dark:bg-surface-muted/30 text-center transition-all flex flex-col items-center justify-center shadow-2xs gap-3.5"
                >
                  <div
                    class="inline-flex items-center gap-1.5 text-xs text-foreground/85 dark:text-muted font-medium"
                  >
                    <Icon
                      name="tabler:info-circle"
                      class="size-4 text-amber-500 shrink-0"
                    />
                    <span>
                      សូមបញ្ចូលយ៉ាងហោចណាស់ <strong>6 ខ្ទង់</strong>
                      (ខ្វះ
                      <span
                        class="font-bold text-amber-600 dark:text-amber-400"
                      >
                        {{ onlyCharLeft }}
                      </span>
                      ខ្ទង់)
                    </span>
                  </div>

                  <!-- 6 Auspicious Progress Dots -->
                  <div class="flex items-center justify-center gap-2">
                    <span
                      v-for="i in 6"
                      :key="i"
                      class="size-2 rounded-full transition-all duration-300"
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
          </div>
        </div>

        <!-- Gemstone Status -->
        <nav
          aria-label="កម្រិតជោគជតានិងពណ៌"
          class="w-full max-w-lg mx-auto px-1 pt-1"
        >
          <div
            class="flex items-center justify-between text-[11px] text-foreground/80 dark:text-muted font-semibold"
          >
            <span class="flex items-center gap-1">
              <span class="size-1.5 rounded-full bg-emerald-500" />
              <span>ល្អណាស់</span>
            </span>
            <span class="flex items-center gap-1">
              <span class="size-1.5 rounded-full bg-blue-500" />
              <span>ល្អ</span>
            </span>
            <span class="flex items-center gap-1">
              <span class="size-1.5 rounded-full bg-stone-400" />
              <span>ធម្មតា</span>
            </span>
            <span class="flex items-center gap-1">
              <span class="size-1.5 rounded-full bg-orange-500" />
              <span>អាក្រក់</span>
            </span>
            <span class="flex items-center gap-1">
              <span class="size-1.5 rounded-full bg-red-500" />
              <span>អាក្រក់ណាស់</span>
            </span>
          </div>
        </nav>
      </div>

      <!-- ============================================================ -->
      <!-- macOS Window Footer: Authentic Signature Raycast Action Bar -->
      <!-- ============================================================ -->
      <footer
        class="h-11 sm:h-12 px-4 sm:px-5 flex items-center justify-between border-t border-border/80 dark:border-white/8 bg-surface-muted/30 dark:bg-white/2 text-[11px] text-muted font-medium shrink-0 backdrop-blur-md"
      >
        <!-- Status Indicator with Glowing Pulse Dot -->
        <div class="flex items-center gap-2">
          <span class="relative flex size-2">
            <span
              v-if="luckResult"
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            />
            <span
              class="relative inline-flex rounded-full size-2 transition-colors duration-300"
              :class="[
                luckResult
                  ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]'
                  : rawDigits.length > 0
                    ? 'bg-amber-500'
                    : 'bg-stone-400 dark:bg-stone-600',
              ]"
            />
          </span>
          <span
            class="font-sans font-medium text-foreground/80 dark:text-muted"
          >
            {{
              luckResult
                ? `លេខតម្រា #${luckResult.index}`
                : rawDigits.length > 0
                  ? `ខ្វះ ${onlyCharLeft} ខ្ទង់ទៀត`
                  : "ត្រៀមរួចរាល់"
            }}
          </span>
        </div>

        <!-- Raycast Action Buttons Cluster -->
        <div class="flex items-center gap-1.5 sm:gap-2">
          <!-- Secondary Copy Pill (Raycast Style) -->
          <button
            v-if="luckResult"
            type="button"
            @click="copyResult"
            class="group h-7 sm:h-7.5 px-2.5 rounded-lg border border-border/80 dark:border-white/8 bg-surface dark:bg-white/5 hover:bg-surface-elevated hover:dark:bg-white/1 active:scale-[0.96] transition-all duration-150 inline-flex items-center gap-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] text-[11px] font-semibold text-foreground/85 hover:text-foreground focus:outline-none"
            title="ចម្លងលទ្ធផល (⌘C)"
          >
            <Icon
              :name="copied ? 'tabler:check' : 'tabler:copy'"
              class="size-3.5 transition-colors"
              :class="copied ? 'text-emerald-500' : 'text-amber-500'"
            />
            <span>{{ copied ? "បានចម្លង!" : "ចម្លង" }}</span>
            <kbd
              class="px-1.5 py-1 rounded text-[10px] font-mono font-bold bg-black/6 dark:bg-black/40 text-foreground/80 dark:text-white/80 border border-black/5 dark:border-white/10 shadow-2xs group-hover:border-amber-500/30 transition-colors inline-flex items-center gap-0.5 [&_span]:trim-both"
            >
              <Icon name="tabler:command" class="size-[1.2em] shrink-0" />
              <span>C</span>
            </kbd>
          </button>

          <!-- Signature Raycast Actions Button (⌘K) -->
          <button
            type="button"
            @click="isCommandPaletteOpen = true"
            class="group h-7 sm:h-7.5 pl-2.5 pr-1.5 rounded-lg border border-border/80 dark:border-white/8 bg-surface dark:bg-white/5 hover:bg-surface-elevated hover:dark:bg-white/1 hover:border-amber-500/40 hover:dark:border-amber-400/30 active:scale-[0.96] transition-all duration-150 inline-flex items-center gap-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] text-[11px] font-semibold text-foreground/85 hover:text-foreground focus:outline-none"
            title="បើកផ្ទាំងបញ្ជា (⌘K)"
          >
            <span class="flex items-center gap-1">
              <Icon name="tabler:command" class="size-3.5 text-amber-500" />
              <span class="trim-both">បញ្ជា</span>
            </span>
            <kbd
              class="px-1.5 py-1 rounded text-[10px] font-mono font-bold bg-black/6 dark:bg-black/40 text-foreground/80 dark:text-white/80 border border-black/5 dark:border-white/10 shadow-2xs group-hover:border-amber-500/30 transition-colors inline-flex items-center gap-0.5 [&_span]:trim-both"
            >
              <Icon name="tabler:command" class="size-[1.2em] shrink-0" />
              <span>K</span>
            </kbd>
          </button>
        </div>
      </footer>
    </article>

    <!-- Attached Modals: Minimal Raycast & About Dialog (Lazy Loaded on Demand) -->
    <LazyRaycastPalette
      v-if="hasOpenedPalette"
      v-model="isCommandPaletteOpen"
      :has-luck-result="!!luckResult"
    />

    <LazyAboutModal
      v-if="hasOpenedAbout"
      v-model="isAboutOpen"
    />
  </div>
</template>
