<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useVideoStore } from "../store";

import VideoPlayer from "./VideoPlayer.vue";
import EllipsisLoading from "./EllipsisLoading.vue";

const store = useVideoStore();

const intervalId = ref(null)

const processing = computed(() => {
    return store.video.info.raw_convert.google_speech.status !== "complete"
})

const result = computed(() => {
    if (processing.value) return {
        transcript: '',
        vtt: '',
        srt: ''
    }
    const baseUrl = `https://res.cloudinary.com/roberthgnz/raw/upload/v${store.video.version}/${store.video.public_id}`
    return {
        transcript: `${baseUrl}.transcript`,
        vtt: `${baseUrl}.vtt`,
        srt: `${baseUrl}.srt`
    }
})

const normalizeUrl = url => {
  return url.replace('http://', 'https://').replace('.mp4', '.m3u8')
}

const videoOptions = computed(() => ({
    controls: true,
    autoplay: false,
    preload: "auto",
    sources: [{
        src: normalizeUrl(store.video.url),
        type: "application/x-mpegURL",
    }],
    tracks: [{
        kind: "subtitles",
        src: result.value.vtt,
        srclang: "en-US",
        label: "English",
        default: true,
    }],
}))

onMounted(() => {
    intervalId.value = setInterval(() => {
        if (processing.value) {
            store.fetchVideoInfo()
        }
    }, 3000)
    if (!processing.value) {
        clearInterval(intervalId.value)
    }
})

onBeforeUnmount(() => {
    clearInterval(intervalId.value)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
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
      <a
        :href="result.vtt"
        download
        class="text-center font-bold mt-4"
      >Download VTT file</a>
      <a
        :href="result.srt"
        download
        class="text-center font-bold mt-4"
      >Download SRT file</a>
      <a
        :href="result.transcript"
        download
        class="text-center font-bold mt-4"
      >Download transcript (includes details
        of the audio transcription)</a>

      <button
        type="button"
        class="bg-[#0d6efd] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        @click="store.reset"
      >
        Upload another video
      </button>
    </template>
  </div>
</template>