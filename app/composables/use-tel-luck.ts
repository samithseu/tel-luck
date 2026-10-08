import type { LuckRating, LuckResult } from "#shared/types/tel-luck";
import { MIN_PHONE_DIGITS, getLuckResult } from "#shared/utils/tel-luck";

// ====================================================================
// Module-level Singleton State (Shared across all components)
// ====================================================================
const phoneInput = ref<string>("");
const isCommandPaletteOpen = ref<boolean>(false);
const isAboutOpen = ref<boolean>(false);
const isMoreMenuOpen = ref<boolean>(false);
const isMinimized = ref<boolean>(false);
const isMaximized = ref<boolean>(false);
const copied = ref<boolean>(false);

let activeInstances = 0;

export const useTelLuck = () => {
  const rawDigits = computed(() => phoneInput.value.replace(/\D/g, ""));

  const onlyCharLeft = computed(() =>
    Math.max(0, MIN_PHONE_DIGITS - rawDigits.value.length),
  );

  const lastSixDigits = computed(() =>
    rawDigits.value.length >= MIN_PHONE_DIGITS
      ? rawDigits.value.slice(-MIN_PHONE_DIGITS)
      : "",
  );

  const luckResult = computed<LuckResult | null>(() =>
    getLuckResult(rawDigits.value),
  );

  const rating = computed<LuckRating>(
    () => luckResult.value?.rating ?? "normal",
  );

  const themeColor = computed(() =>
    luckResult.value ? `var(--clr-${rating.value})` : "var(--clr-gold)",
  );

  const ratingMeta: Record<
    string,
    { label: string; icon: string; badgeStyle: string; colorHex: string }
  > = {
    excellent: {
      label: "ល្អណាស់",
      icon: "tabler:sparkles",
      badgeStyle:
        "bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 border-emerald-500/40",
      colorHex: "#10b981",
    },
    good: {
      label: "ល្អ",
      icon: "tabler:circle-check",
      badgeStyle:
        "bg-blue-500/15 text-blue-900 dark:text-blue-300 border-blue-500/40",
      colorHex: "#3b82f6",
    },
    normal: {
      label: "ធម្មតា",
      icon: "tabler:scale",
      badgeStyle:
        "bg-stone-500/15 text-stone-900 dark:text-stone-200 border-stone-500/40",
      colorHex: "#78716c",
    },
    bad: {
      label: "អាក្រក់",
      icon: "tabler:alert-triangle",
      badgeStyle:
        "bg-orange-500/15 text-orange-950 dark:text-orange-300 border-orange-500/40",
      colorHex: "#f97316",
    },
    terrible: {
      label: "អាក្រក់ណាស់",
      icon: "tabler:alert-octagon",
      badgeStyle:
        "bg-red-500/15 text-red-950 dark:text-red-300 border-red-500/40",
      colorHex: "#ef4444",
    },
  };

  const copyResult = async () => {
    if (!luckResult.value) return;
    const text = `ទស្សន៍ទាយលេខទូរសព្ទ ${phoneInput.value}៖ (${luckResult.value.short}) ${luckResult.value.long}។ - គណនាតាម tel-luck.samith.dev`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-secure contexts or legacy browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch {
      // Fallback attempt
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2000);
      } catch {
        // clipboard write failed silently
      }
    }
  };

  const setSample = (sample: string) => {
    phoneInput.value = sample;
    if (isMinimized.value) isMinimized.value = false;
  };

  const clear = () => {
    phoneInput.value = "";
  };

  const handleGlobalKeydown = (e: KeyboardEvent) => {
    // Escape closes open modals or menus first, then clears input if nothing is open
    if (e.key === "Escape") {
      if (isCommandPaletteOpen.value) {
        isCommandPaletteOpen.value = false;
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (isMoreMenuOpen.value) {
        isMoreMenuOpen.value = false;
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (isAboutOpen.value) {
        isAboutOpen.value = false;
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (phoneInput.value) {
        clear();
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    }

    const isCmdOrCtrl = e.metaKey || e.ctrlKey;
    if (!isCmdOrCtrl) return;

    const key = e.key.toLowerCase();
    if (key === "k") {
      e.preventDefault();
      isCommandPaletteOpen.value = !isCommandPaletteOpen.value;
    } else if (key === "c" && luckResult.value) {
      // Allow native copy if text is selected inside an input or document
      const activeEl =
        typeof document !== "undefined" ? document.activeElement : null;
      const isInput =
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement;
      const hasSelection =
        typeof window !== "undefined" &&
        (window.getSelection()?.toString().length ?? 0) > 0;

      if (isInput && hasSelection) {
        return;
      }

      e.preventDefault();
      copyResult();
    }
  };

  onMounted(() => {
    if (typeof window !== "undefined") {
      activeInstances++;
      if (activeInstances === 1) {
        window.addEventListener("keydown", handleGlobalKeydown);
      }
    }
  });

  onUnmounted(() => {
    if (typeof window !== "undefined") {
      activeInstances = Math.max(0, activeInstances - 1);
      if (activeInstances === 0) {
        window.removeEventListener("keydown", handleGlobalKeydown);
      }
    }
  });

  return {
    phoneInput,
    isCommandPaletteOpen,
    isAboutOpen,
    isMoreMenuOpen,
    isMinimized,
    isMaximized,
    copied,
    rawDigits,
    onlyCharLeft,
    lastSixDigits,
    luckResult,
    rating,
    themeColor,
    ratingMeta,
    copyResult,
    setSample,
    clear,
  };
};
