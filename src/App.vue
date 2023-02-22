<script setup>
import { onMounted } from 'vue';
import { inject } from '@vercel/analytics'

import { useVideoStore } from "./store";

import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import Upload from './components/Upload.vue'
import Preview from './components/Preview.vue'

const store = useVideoStore();

onMounted(inject)
</script>

<template>
  <div class="flex max-w-7xl mx-auto flex-col items-center justify-center min-h-screen">
    <TheHeader />
    <main class="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4">
      <div class="mb-4">
        <h2
          class="text-5xl font-extrabold text-gray-800 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0d6efd] to-pink-600"
        >
          AI Video Transcription
        </h2>
        <p class="text-gray-600">
          Generate automatic transcripts and subtitles for your videos with the help of the neural network-based.
        </p>
        <p>
          <small>(Only english language is supported for now)</small>
        </p>
      </div>
      <div class="w-full md:w-2/6 mt-4">
        <Upload />
        <Preview v-if="store.currentStatus === store.status.READY" />
      </div>
    </main>
    <TheFooter />
  </div>
  <BuzzNotifyContainer />
</template>
