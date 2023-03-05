<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useVideoStore } from "../store";

import VideoPlayer from "./VideoPlayer.vue";
import EllipsisLoading from "./EllipsisLoading.vue";
import DownloadButton from "./DownloadButton.vue";

const store = useVideoStore();

const intervalId = ref(null);

const processing = computed(() => {
  return store.video.info.raw_convert.google_speech.status !== "complete";
});

const result = computed(() => {
  if (processing.value)
    return {
      transcript: "",
      vtt: "",
      srt: "",
    };
  const baseUrl = `https://res.cloudinary.com/roberthgnz/raw/upload/v${store.video.version}/${store.video.public_id}`;
  return {
    transcript: `${baseUrl}.transcript`,
    vtt: `${baseUrl}.vtt`,
    srt: `${baseUrl}.srt`,
  };
});

const videoOptions = computed(() => ({
  source: store.video.public_id,
  track: {
    url: result.value.vtt,
    language: "en-US",
    label: "English",
  },
}));

onMounted(() => {
  intervalId.value = setInterval(() => {
    if (processing.value) {
      store.fetchVideoInfo();
    }
  }, 3000);
  if (!processing.value) {
    clearInterval(intervalId.value);
  }
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <template v-if="processing">
    <EllipsisLoading />
    <p class="text-center font-bold">
      Generating transcription, please wait...
    </p>
  </template>
  <template v-else>
    <div class="aspect-video">
      <VideoPlayer :options="videoOptions" />
    </div>
    <div class="flex flex-col">
      <div class="grid grid-cols-2 gap-4">
        <DownloadButton :href="result.vtt">Download VTT</DownloadButton>
        <DownloadButton :href="result.srt">Download SRT</DownloadButton>
      </div>
      <DownloadButton :href="result.transcript"
        >Download transcript</DownloadButton
      >
      <small class="-mt-2">
        (includes details of the audio transcription)</small
      >
      <button
        type="button"
        class="bg-[#0d6efd] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
        @click="store.reset"
      >
        Upload another video
      </button>
    </div>
  </template>
</template>
