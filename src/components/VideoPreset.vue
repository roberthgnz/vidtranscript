<script setup>
defineEmits(['click'])
defineProps(['src'])
</script>

<template>
  <div
    class="relative cursor-pointer"
    @click="$emit('click', src)"
  >
    <video
      class="aspect-video opacity-100 hover:opacity-75 transition-all"
      :src="src"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0d6efd"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  </div>
</template>