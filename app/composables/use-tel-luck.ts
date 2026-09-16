export const useTelLuck = () => {
  const phoneInput = ref<string>("");

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

  const setSample = (sample: string) => {
    phoneInput.value = sample;
  };

  const clear = () => {
    phoneInput.value = "";
  };

  return {
    phoneInput,
    rawDigits,
    onlyCharLeft,
    lastSixDigits,
    luckResult,
    rating,
    themeColor,
    setSample,
    clear,
  };
};
