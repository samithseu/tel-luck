<script setup lang="ts">
defineProps<{
  isMinimized?: boolean;
  isMaximized?: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "minimize"): void;
  (e: "maximize"): void;
}>();

const isHovered = ref(false);
</script>

<template>
  <div
    class="flex items-center gap-2 group/lights py-1"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    aria-label="macOS Window Controls"
  >
    <!-- Close / Clear Button (Red) -->
    <button
      type="button"
      @click="emit('close')"
      class="relative size-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center transition-all duration-150 active:brightness-75 shadow-xs focus:outline-none"
      title="សម្អាតលេខ / បិទផ្ទាំង (Clear / Close)"
      aria-label="Close or Clear"
    >
      <Icon
        name="tabler:x"
        class="size-2 text-[#4c0100] transition-opacity duration-150"
        :class="isHovered ? 'opacity-100' : 'opacity-0'"
      />
    </button>

    <!-- Minimize Button (Yellow) -->
    <button
      type="button"
      @click="emit('minimize')"
      class="relative size-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center transition-all duration-150 active:brightness-75 shadow-xs focus:outline-none"
      :title="isMinimized ? 'ពង្រីកមកវិញ (Restore)' : 'បង្រួមផ្ទាំង (Minimize)'"
      aria-label="Minimize"
    >
      <Icon
        name="tabler:minus"
        class="size-2 text-[#5e3800] transition-opacity duration-150 stroke-3"
        :class="isHovered ? 'opacity-100' : 'opacity-0'"
      />
    </button>

    <!-- Zoom / Maximize Button (Green) -->
    <button
      type="button"
      @click="emit('maximize')"
      class="relative size-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center transition-all duration-150 active:brightness-75 shadow-xs focus:outline-none"
      :title="isMaximized ? 'ទំហំធម្មតា (Compact)' : 'ពង្រីកពេញ (Maximize)'"
      aria-label="Maximize"
    >
      <Icon
        :name="
          isMaximized ? 'tabler:arrows-minimize' : 'tabler:arrows-maximize'
        "
        class="size-2 text-[#004d11] transition-opacity duration-150 stroke-[2.5]"
        :class="isHovered ? 'opacity-100' : 'opacity-0'"
      />
    </button>
  </div>
</template>
