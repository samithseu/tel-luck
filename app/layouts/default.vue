<template>
  <div
    class="relative min-h-svh w-full flex flex-col justify-between overflow-x-hidden bg-background text-foreground transition-colors duration-500"
  >
    <!-- Ambient Atmospheric Halo (Pure CSS) -->
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        class="absolute -top-52 left-1/2 -translate-x-1/2 size-150 sm:size-200 rounded-full bg-linear-to-b from-amber-500/10 via-amber-500/3 to-transparent blur-3xl dark:from-amber-400/6 dark:via-amber-500/1"
      />
    </div>

    <!-- Header Navigation (Clean, Minimal, Luxury) -->
    <header
      class="w-full max-w-4xl mx-auto px-5 py-4 sm:px-8 sm:py-6 flex items-center justify-between z-20"
    >
      <!-- Royal Brand Logo with Khmer Seal -->
      <NuxtLink
        to="/"
        class="group flex items-center gap-2.5 sm:gap-3 transition-transform duration-200 active:scale-98"
        aria-label="ទំព័រដើម tel-luck"
      >
        <div
          class="relative size-9 sm:size-10 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center shadow-sm group-hover:border-amber-500/50 group-hover:shadow-[0_0_14px_rgba(245,158,11,0.22)] transition-all"
        >
          <KbachOrnament
            variant="medallion"
            class="size-6 sm:size-7 drop-shadow-[0_1px_4px_rgba(245,158,11,0.2)]"
          />
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-1.5">
            <span
              class="text-base sm:text-lg font-bold tracking-tight text-foreground font-sans leading-none"
            >
              tel-luck
            </span>
            <span
              class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 leading-none"
            >
              ៨០
            </span>
          </div>
          <span
            class="text-[11px] font-medium text-muted leading-tight mt-0.5 tracking-wide"
          >
            ទស្សន៍ទាយលេខទូរសព្ទ
          </span>
        </div>
      </NuxtLink>

      <!-- Action Items -->
      <nav class="flex items-center gap-2 sm:gap-3">
        <!-- Formula Reference Link -->
        <NuxtLink
          to="https://komnotra.wordpress.com/fortune-tailer/phone-number-fortune/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-muted rounded-full border border-border/80 hover:border-amber-500/40 hover:text-foreground hover:bg-surface-elevated transition-all duration-200"
          title="ក្បួនទស្សន៍ទាយ"
        >
          <Icon name="tabler:book" class="size-3.5 text-amber-500" />
          <span class="hidden xs:inline">ក្បួនតម្រា</span>
          <Icon name="tabler:external-link" class="size-3 opacity-60" />
        </NuxtLink>

        <!-- GitHub Link -->
        <NuxtLink
          to="https://github.com/samithseu/tel-luck"
          target="_blank"
          rel="noopener noreferrer"
          class="size-8 sm:size-9 inline-flex items-center justify-center rounded-full text-muted border border-border/80 hover:border-amber-500/40 hover:text-foreground hover:bg-surface-elevated transition-all duration-200"
          aria-label="ប្រភពកូដ GitHub"
          title="GitHub"
        >
          <Icon name="tabler:brand-github" class="size-4" />
        </NuxtLink>
      </nav>
    </header>

    <!-- Main Hero Stage -->
    <main
      class="flex-1 w-full max-w-4xl mx-auto px-4 py-4 sm:px-6 sm:py-8 flex flex-col items-center justify-center z-10"
    >
      <slot />
    </main>

    <!-- Minimal Royal Stele Footer -->
    <footer
      class="w-full max-w-4xl mx-auto px-4 py-6 sm:px-8 text-center text-xs text-muted z-10"
    >
      <div class="flex flex-col items-center gap-2">
        <KbachOrnament
          variant="divider"
          class="max-w-40 sm:max-w-50 text-border"
        />

        <p
          class="inline-flex items-center gap-1.5 flex-wrap justify-center text-[11px] sm:text-xs text-muted mt-1"
        >
          <NuxtLink
            to="https://komnotra.wordpress.com/fortune-tailer/phone-number-fortune/"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-foreground transition-colors underline decoration-dotted decoration-border underline-offset-4"
          >
            ផ្អែកលើក្បួនតម្រាបុរាណ
          </NuxtLink>
        </p>
      </div>
    </footer>
  </div>
</template>
