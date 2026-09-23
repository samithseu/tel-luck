<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from "vue";

interface RaycastAction {
  id: string;
  category: "សកម្មភាព (Actions)" | "ប្រភពនិងព័ត៌មាន (Source & Info)";
  title: string;
  subtitle?: string;
  icon: string;
  shortcut?: string;
  run: () => void;
}

const props = defineProps<{
  modelValue: boolean;
  hasLuckResult: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const searchQuery = ref("");
const selectedIndex = ref(0);
const searchInputRef = ref<HTMLInputElement | null>(null);

const { copyResult, clear, isAboutOpen, isCommandPaletteOpen } = useTelLuck();

const actions = computed<RaycastAction[]>(() => [
  {
    id: "copy",
    category: "សកម្មភាព (Actions)",
    title: "ចម្លងលទ្ធផលទស្សន៍ទាយ (Copy Prediction)",
    subtitle: props.hasLuckResult
      ? "ចម្លងអត្ថន័យទំនាយទៅក្ដារតម្បៀតខ្ទាស់"
      : "ទាមទារលេខ ៦ ខ្ទង់ឡើងទៅ",
    icon: "tabler:copy",
    shortcut: "⌘C",
    run: () => {
      copyResult();
      emit("update:modelValue", false);
    },
  },
  {
    id: "clear",
    category: "សកម្មភាព (Actions)",
    title: "សម្អាតលេខទូរសព្ទចេញ (Clear Input)",
    subtitle: "លុបលេខដែលបានបញ្ចូលទាំងអស់ចេញ",
    icon: "tabler:x",
    shortcut: "ESC",
    run: () => {
      clear();
      emit("update:modelValue", false);
    },
  },
  {
    id: "source-komnotra",
    category: "ប្រភពនិងព័ត៌មាន (Source & Info)",
    title: "ក្បួនទស្សន៍ទាយ Komnotra (Formula Source)",
    subtitle: "បើកមើលអត្ថបទកំណត់ត្រាទស្សន៍ទាយលេខទូរសព្ទ",
    icon: "tabler:external-link",
    run: () => {
      if (typeof window !== "undefined") {
        window.open(
          "https://komnotra.wordpress.com/fortune-tailer/phone-number-fortune/",
          "_blank",
          "noopener,noreferrer",
        );
      }
      emit("update:modelValue", false);
    },
  },
  {
    id: "source-github",
    category: "ប្រភពនិងព័ត៌មាន (Source & Info)",
    title: "ប្រភពកូដលើ GitHub (View Repository)",
    subtitle: "github.com/samithseu/tel-luck",
    icon: "tabler:brand-github",
    run: () => {
      if (typeof window !== "undefined") {
        window.open(
          "https://github.com/samithseu/tel-luck",
          "_blank",
          "noopener,noreferrer",
        );
      }
      emit("update:modelValue", false);
    },
  },
  {
    id: "about",
    category: "ប្រភពនិងព័ត៌មាន (Source & Info)",
    title: "អំពី tel-luck (About This App)",
    subtitle: "ព័ត៌មានកម្មវិធី និងអ្នកអភិវឌ្ឍន៍ Samith Seu",
    icon: "tabler:info-circle",
    run: () => {
      isAboutOpen.value = true;
      emit("update:modelValue", false);
    },
  },
]);

const filteredActions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return actions.value;
  return actions.value.filter(
    (action) =>
      action.title.toLowerCase().includes(query) ||
      action.category.toLowerCase().includes(query) ||
      (action.subtitle && action.subtitle.toLowerCase().includes(query)),
  );
});

const focusInput = () => {
  nextTick(() => {
    searchInputRef.value?.focus();
    if (typeof requestAnimationFrame !== "undefined") {
      requestAnimationFrame(() => {
        searchInputRef.value?.focus();
      });
    }
    setTimeout(() => {
      searchInputRef.value?.focus();
    }, 50);
  });
};

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      searchQuery.value = "";
      selectedIndex.value = 0;
      focusInput();
    }
  },
  { immediate: true },
);

onMounted(() => {
  if (props.modelValue) {
    focusInput();
  }
});

watch(searchQuery, () => {
  selectedIndex.value = 0;
});

const onKeydown = (e: KeyboardEvent) => {
  if (!props.modelValue) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (filteredActions.value.length > 0) {
      selectedIndex.value =
        (selectedIndex.value + 1) % filteredActions.value.length;
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (filteredActions.value.length > 0) {
      selectedIndex.value =
        (selectedIndex.value - 1 + filteredActions.value.length) %
        filteredActions.value.length;
    }
  } else if (e.key === "Enter") {
    e.preventDefault();
    const action = filteredActions.value[selectedIndex.value];
    if (action) {
      action.run();
    }
  } else if (e.key === "Escape") {
    e.preventDefault();
    e.stopPropagation();
    isCommandPaletteOpen.value = false;
    emit("update:modelValue", false);
  }
};
</script>

<template>
  <transition
    appear
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 bg-black/40 dark:bg-black/60 backdrop-blur-md"
      @click.self="emit('update:modelValue', false)"
      @keydown="onKeydown"
    >
      <!-- Raycast Floating Window -->
      <div
        class="relative w-full max-w-lg rounded-2xl bg-surface/95 dark:bg-[#18181b]/95 border border-border dark:border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col max-h-[80vh] ring-1 ring-black/5 dark:ring-white/10"
        role="dialog"
        aria-modal="true"
        aria-label="Raycast Command Menu"
      >
        <!-- Search Header Bar -->
        <div
          class="flex items-center gap-3 px-4 py-3.5 border-b border-border/80 dark:border-white/10 bg-surface-muted/40 dark:bg-white/3"
        >
          <Icon name="tabler:command" class="size-5 text-amber-500 shrink-0" />
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="text"
            autofocus
            placeholder="ស្វែងរកបញ្ជា... (Type a command)"
            class="flex-1 bg-transparent text-sm sm:text-base font-medium text-foreground placeholder:text-subtle focus:outline-none tracking-wide"
          />
          <button
            v-if="searchQuery"
            type="button"
            @click="searchQuery = ''"
            class="size-5 rounded-full flex items-center justify-center text-muted hover:text-foreground"
          >
            <Icon name="tabler:x" class="size-3.5" />
          </button>
          <kbd
            class="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded border border-border dark:border-white/10 bg-surface dark:bg-white/5 text-muted shadow-2xs trim-both"
          >
            ESC
          </kbd>
        </div>

        <!-- Action Items List -->
        <div class="flex-1 overflow-y-auto p-2 space-y-1 overscroll-contain">
          <div
            v-if="filteredActions.length === 0"
            class="py-10 text-center text-muted text-sm"
          >
            <Icon name="tabler:search" class="size-7 mx-auto mb-2 opacity-40" />
            <p>មិនមានបញ្ជាត្រូវនឹង "{{ searchQuery }}" ទេ</p>
          </div>

          <div
            v-for="(action, idx) in filteredActions"
            :key="action.id"
            @click="action.run"
            @mouseenter="selectedIndex = idx"
            class="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left cursor-pointer transition-colors duration-150"
            :class="[
              selectedIndex === idx
                ? 'bg-amber-500/15 text-foreground border border-amber-500/30'
                : 'text-foreground/90 hover:bg-surface-elevated/70 border border-transparent',
            ]"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div
                class="size-8 rounded-lg flex items-center justify-center shrink-0 border"
                :class="[
                  selectedIndex === idx
                    ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-xs'
                    : 'bg-surface-muted text-muted border-border',
                ]"
              >
                <Icon :name="action.icon" class="size-4" />
              </div>
              <div class="flex flex-col min-w-0">
                <span
                  class="text-xs sm:text-sm font-semibold truncate leading-tight"
                >
                  {{ action.title }}
                </span>
                <span
                  v-if="action.subtitle"
                  class="text-[11px] text-muted truncate mt-0.5"
                >
                  {{ action.subtitle }}
                </span>
              </div>
            </div>

            <!-- Shortcut Badge -->
            <div v-if="action.shortcut" class="shrink-0 flex items-center">
              <kbd
                class="px-2 py-1 rounded-sm text-[10px] font-mono font-bold border text-muted shadow-2xs inline-flex items-center gap-0.5 [&_span]:trim-both trim-both"
                :class="[
                  selectedIndex === idx
                    ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                    : 'border-border/80 dark:border-white/10 bg-surface dark:bg-white/5 text-muted',
                ]"
              >
                <template v-if="action.shortcut.includes('⌘')">
                  <Icon name="tabler:command" class="size-[1.2em] shrink-0" />
                  <span>{{ action.shortcut.replace("⌘", "") }}</span>
                </template>
                <template v-else>
                  {{ action.shortcut }}
                </template>
              </kbd>
            </div>
          </div>
        </div>

        <!-- Raycast Status Bar Footer -->
        <div
          class="px-4 py-2 border-t border-border/80 dark:border-white/10 bg-surface-muted/30 dark:bg-white/2 flex items-center justify-between text-[11px] text-muted font-medium"
        >
          <div class="flex items-center gap-1.5">
            <span class="size-1.5 rounded-full bg-amber-500" />
            <span>macOS Action Menu</span>
          </div>
          <div class="flex items-center gap-3 text-[10px]">
            <span>↑↓ រុករក</span>
            <span>↵ ជ្រើសរើស</span>
            <span>esc បិទ</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
