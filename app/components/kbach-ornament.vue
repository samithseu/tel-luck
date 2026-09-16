<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "medallion" | "divider" | "crown";
    class?: string;
  }>(),
  {
    variant: "medallion",
    class: "",
  },
);
</script>

<template>
  <!-- Variant: Kbach Phka Chan Royal Medallion (ក្បាច់ផ្កាចន្ទ) -->
  <svg
    v-if="variant === 'medallion'"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="size-10 sm:size-12 select-none pointer-events-none drop-shadow-sm"
    :class="class"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="medallionGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="35%" stop-color="#EAB308" />
        <stop offset="70%" stop-color="#CA8A04" />
        <stop offset="100%" stop-color="#854D0E" />
      </linearGradient>
      <linearGradient id="innerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#CA8A04" stop-opacity="0.3" />
      </linearGradient>
    </defs>

    <!-- Outer Fine Filigree Ring -->
    <circle
      cx="50"
      cy="50"
      r="46"
      stroke="url(#medallionGold)"
      stroke-width="0.75"
      stroke-dasharray="1.5 2.5"
      opacity="0.6"
    />
    <circle
      cx="50"
      cy="50"
      r="43"
      stroke="url(#medallionGold)"
      stroke-width="0.5"
      opacity="0.4"
    />

    <!-- 8 Symmetrical Kbach Chan Lotus Petals (Rotated 45deg each) -->
    <g transform="translate(50, 50)">
      <!-- 4 Cardinal Petals -->
      <g
        v-for="deg in [0, 90, 180, 270]"
        :key="deg"
        :transform="`rotate(${deg})`"
      >
        <!-- Main Outer Petal Blade with Traditional Outward Curve -->
        <path
          d="M0 -39 C-6 -26, -11 -16, -5 -6 C-2 -2, 0 0, 0 0 C0 0, 2 -2, 5 -6 C11 -16, 6 -26, 0 -39 Z"
          fill="url(#medallionGold)"
          opacity="0.95"
        />
        <!-- Inner Petal Vein -->
        <path
          d="M0 -36 L0 -4"
          stroke="#FEF9C3"
          stroke-width="0.75"
          stroke-linecap="round"
          opacity="0.8"
        />
        <!-- Micro-gem bead at tip -->
        <circle cx="0" cy="-41" r="1" fill="#FEF08A" />
      </g>

      <!-- 4 Diagonal Petals (Slightly more compact for depth) -->
      <g
        v-for="deg in [45, 135, 225, 315]"
        :key="deg"
        :transform="`rotate(${deg})`"
      >
        <path
          d="M0 -33 C-5 -22, -9 -14, -4 -5 C-1 -1, 0 0, 0 0 C0 0, 1 -1, 4 -5 C9 -14, 5 -22, 0 -33 Z"
          fill="url(#medallionGold)"
          opacity="0.8"
        />
        <path
          d="M0 -30 L0 -3"
          stroke="#FEF08A"
          stroke-width="0.5"
          opacity="0.7"
        />
        <circle cx="0" cy="-35" r="0.75" fill="#FEF08A" />
      </g>

      <!-- Sacred Core: Concentric Rings & Auspicious Center Diamond -->
      <circle
        cx="0"
        cy="0"
        r="10"
        fill="#0C0A09"
        stroke="url(#medallionGold)"
        stroke-width="1"
      />
      <circle cx="0" cy="0" r="8" fill="url(#innerGlow)" />

      <!-- Central Diamond Sparkle -->
      <polygon points="0,-6 4,0 0,6 -4,0" fill="#FFFFFF" />
      <circle cx="0" cy="0" r="1.5" fill="#EAB308" />
    </g>
  </svg>

  <!-- Variant: Royal Crown Pinnacle Ornament (ក្បាច់កំពូលកណ្តាល) -->
  <svg
    v-else-if="variant === 'crown'"
    viewBox="0 0 160 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="w-32 sm:w-40 h-auto select-none pointer-events-none opacity-80"
    :class="class"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#EAB308" stop-opacity="0" />
        <stop offset="30%" stop-color="#EAB308" stop-opacity="0.6" />
        <stop offset="50%" stop-color="#FDE047" stop-opacity="1" />
        <stop offset="70%" stop-color="#EAB308" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#EAB308" stop-opacity="0" />
      </linearGradient>
    </defs>

    <!-- Central Flame Tip (Kbach Trisor / Phka Chuk) -->
    <path
      d="M80 2 C77 9, 74 15, 68 18 C73 19, 77 22, 80 29 C83 22, 87 19, 92 18 C86 15, 83 9, 80 2 Z"
      fill="url(#crownGold)"
    />
    <circle cx="80" cy="1" r="1" fill="#FDE047" />

    <!-- Left Wing Scroll -->
    <path
      d="M68 18 C58 18, 50 14, 42 17 C36 19, 34 24, 40 25 C46 26, 48 20, 36 21 C24 22, 14 18, 2 20"
      stroke="url(#crownGold)"
      stroke-width="1.2"
      stroke-linecap="round"
    />
    <circle cx="42" cy="17" r="1" fill="#FDE047" opacity="0.8" />

    <!-- Right Wing Scroll -->
    <path
      d="M92 18 C102 18, 110 14, 118 17 C124 19, 126 24, 120 25 C114 26, 112 20, 124 21 C136 22, 146 18, 158 20"
      stroke="url(#crownGold)"
      stroke-width="1.2"
      stroke-linecap="round"
    />
    <circle cx="118" cy="17" r="1" fill="#FDE047" opacity="0.8" />
  </svg>

  <!-- Variant: Minimal Stele Divider Line with Kbach Chan Accent -->
  <svg
    v-else-if="variant === 'divider'"
    viewBox="0 0 240 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full max-w-50 h-auto select-none pointer-events-none opacity-50"
    :class="class"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="currentColor" stop-opacity="0" />
        <stop offset="50%" stop-color="currentColor" stop-opacity="0.6" />
        <stop offset="100%" stop-color="currentColor" stop-opacity="0" />
      </linearGradient>
    </defs>
    <line
      x1="0"
      y1="8"
      x2="100"
      y2="8"
      stroke="url(#goldLine)"
      stroke-width="0.75"
    />
    <g transform="translate(120, 8)">
      <polygon points="0,-4 3,0 0,4 -3,0" fill="#EAB308" />
      <circle cx="-10" cy="0" r="1" fill="currentColor" />
      <circle cx="10" cy="0" r="1" fill="currentColor" />
    </g>
    <line
      x1="140"
      y1="8"
      x2="240"
      y2="8"
      stroke="url(#goldLine)"
      stroke-width="0.75"
    />
  </svg>
</template>
