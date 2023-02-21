<script setup>
import { useVideoStore } from "./store";

import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import Upload from './components/Upload.vue'

const store = useVideoStore();

</script>

<template>
  <div class="flex max-w-7xl mx-auto flex-col items-center justify-center min-h-screen">
    <TheHeader />
    <main class="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4">
      <Upload />
      <div v-if="store.currentStatus === store.status.READY" class="flex flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center">
          <video :src="store.video.secure_url" controls class="w-1/2"></video>
          <button class="bg-orange-100  text-orange-800 font-semibold py-2 px-4 rounded pointer-events-none">
            <i class="fas fa-cloud-upload-alt"></i> Upload Video
          </button>
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>
