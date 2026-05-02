import type { LuckData } from "~/types/tel-luck";

export const useTelLuck = () => {
  // Constants
  const MOD_FACTOR = 80;
  const MIN_PHONE_LENGTH = 6;

  // Data
  const asyncData = useAsyncData<LuckData[]>("tel-luck", () =>
    $fetch("/api/luck"),
  );

  const data = computed(() => asyncData.data?.value);

  // Refs
  const phoneInput = ref<string>("");
  const onlyCharLeft = computed(() => Math.abs(phoneInput.value.length - 6));

  const luckResult = computed(() => {
    if (phoneInput.value.length < MIN_PHONE_LENGTH || !data.value?.length)
      return null;

    const lastSix = Number(phoneInput.value.slice(-6));
    if (isNaN(lastSix)) return null;

    // Simplified Math: ((x / 80) % 1) * 80 = x % 80
    const index = lastSix % MOD_FACTOR;

    // Ensure the index stays within bounds (1-80 mapping to 0-79)
    const lookupIndex = index === 0 ? MOD_FACTOR - 1 : index - 1;
    return data.value[lookupIndex];
  });

  const className = computed(() => luckResult.value?.short || "");

  return {
    asyncData,
    phoneInput,
    luckResult,
    className,
    onlyCharLeft,
  };
};
