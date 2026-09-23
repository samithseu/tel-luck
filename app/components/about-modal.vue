<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
      @click.self="emit('update:modelValue', false)"
      role="dialog"
      aria-modal="true"
      aria-label="About tel-luck"
    >
      <!-- macOS About Dialog Box -->
      <div
        class="relative w-full max-w-xs rounded-2xl bg-surface/95 dark:bg-[#18181b]/95 border border-border dark:border-white/10 p-5 sm:p-6 shadow-2xl backdrop-blur-2xl text-center space-y-3.5 ring-1 ring-black/5 dark:ring-white/10"
      >
        <!-- App Icon -->
        <div
          class="relative mx-auto size-14 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center shadow-md"
        >
          <KbachOrnament
            variant="medallion"
            class="size-10 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]"
          />
        </div>

        <div>
          <h3 class="text-lg font-bold text-foreground tracking-tight">
            tel-luck
          </h3>
          <p class="text-[11px] font-semibold text-muted mt-0.5">
            ជំនាន់ 2.0 (macOS Edition)
          </p>
        </div>

        <p class="text-xs text-muted leading-relaxed">
          កម្មវិធីទស្សន៍ទាយលេខទូរសព្ទតាមក្បួនតម្រាបុរាណខ្មែរ 80 ខ្ទង់
          ដោយប្រើប្រាស់ប្រមាណវិធីម៉ូឌុល (Modulo 80)។
        </p>

        <!-- Developer Attribution -->
        <div
          class="py-2 px-3 rounded-xl bg-surface-muted/50 dark:bg-white/3 border border-border/80 text-xs space-y-1"
        >
          <div class="text-muted text-[11px]">បង្កើតឡើងដោយ</div>
          <div class="font-bold text-foreground">Samith Seu (ស៊ឺ សាមីត)</div>
          <div
            class="flex items-center justify-center gap-3 pt-1 text-muted text-xs"
          >
            <NuxtLink
              to="https://github.com/samithseu/tel-luck"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-amber-500 transition-colors inline-flex items-center gap-1"
            >
              <Icon name="tabler:brand-github" class="size-3.5" />
              <span>GitHub</span>
            </NuxtLink>
            <span>•</span>
            <NuxtLink
              to="https://komnotra.wordpress.com/fortune-tailer/phone-number-fortune/"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-amber-500 transition-colors inline-flex items-center gap-1"
            >
              <Icon name="tabler:external-link" class="size-3.5" />
              <span>ក្បួនតម្រា</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Close Action Button -->
        <button
          type="button"
          @click="emit('update:modelValue', false)"
          class="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs active:scale-98 transition-all shadow-xs"
        >
          យល់ព្រម (Close)
        </button>
      </div>
    </div>
  </transition>
</template>
