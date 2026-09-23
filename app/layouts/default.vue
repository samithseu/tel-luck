<template>
  <div
    class="relative min-h-svh w-full flex items-center justify-center p-2 sm:p-4 md:p-8 overflow-x-hidden bg-[#e5e5ea] dark:bg-[#0c0c0e] text-foreground transition-colors duration-500 selection:bg-amber-500/30 selection:text-foreground"
  >
    <!-- macOS Ambient Desktop Aurora Backdrop -->
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <!-- Subtle multi-layer ambient glow -->
      <div
        class="absolute -top-40 -left-40 size-120 sm:size-180 rounded-full bg-linear-to-br from-amber-500/10 via-amber-600/4 to-transparent blur-3xl dark:from-amber-500/8 dark:via-amber-600/2"
      />
      <div
        class="absolute -bottom-40 -right-40 size-120 sm:size-180 rounded-full bg-linear-to-tl from-indigo-500/8 via-sky-500/4 to-transparent blur-3xl dark:from-indigo-600/6 dark:via-purple-600/2"
      />
      <!-- Subtle Vignette Grid Pattern -->
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.06)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]"
      />
    </div>

    <!-- The Singular Centerpiece: macOS Application Window -->
    <main class="w-full flex items-center justify-center z-10">
      <slot />
    </main>
  </div>
</template>
