<script setup>
import { onMounted, ref } from "vue";

import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

import { useVideoStore } from "../store";

import EllipsisLoading from "./EllipsisLoading.vue";

const store = useVideoStore();

const formRef = ref(null);

const acceptedFiles = "video/mp4,video/x-m4v,video/*";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

onMounted(() => {
    const myDropzone = new Dropzone(formRef.value, {
        maxFiles: 1,
        acceptedFiles,
    });
    myDropzone.on('sending', (file, _, formData) => {
        formData.append('file', file);
        formData.append('upload_preset', preset);
        formData.append('api_key', apiKey);
        store.setStatus(store.status.PROCESSING);
    });
    myDropzone.on("success", (_, response) => {
        store.$patch({
            video: response,
        });
        store.setStatus(store.status.READY);
    });
});
</script>

<template>
    <form ref="formRef" v-if="store.currentStatus === store.status.INIT" :action="url"
        class="border-dashed border-2 border-gray-300 aspect-video p-4 rounded flex items-center justify-center flex-col">
        <button type="button" class="bg-orange-100  text-orange-800 font-semibold py-2 px-4 rounded pointer-events-none">
            <i class="fas fa-cloud-upload-alt"></i> Upload Video
        </button>
    </form>
    <div v-else-if="store.currentStatus === store.status.PROCESSING" class="flex flex-col items-center justify-center">
        <EllipsisLoading />
        <p class="text-center font-extrabold">Processing video...</p>
    </div>
</template>
