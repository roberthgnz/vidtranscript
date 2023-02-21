<script setup>
import { onMounted, ref } from "vue";
import { Notify } from "@reliutg/buzz-notify";

import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

import { useVideoStore } from "../store";

import EllipsisLoading from "./EllipsisLoading.vue";

const store = useVideoStore();

const formRef = ref(null);

const acceptedFiles = "video/mp4,video/x-m4v,video/*";

const isValidFileType = (file) => {
    const acceptedFiles = ["video/mp4", "video/x-m4v", "video/*"];
    if (acceptedFiles.indexOf(file.type) === -1) {
        return false;
    }
    return true;
};

const isValidFileSize = (file) => {
    const maxFileSize = 10 * 1024 * 1024;
    if (file.size > maxFileSize) {
        return false;
    }
    return true;
};

const uploadFile = async file => {
    try {
        const formData = new FormData();

        if (!isValidFileType(file)) {
            throw new Error('Invalid file type');
        }

        if (!isValidFileSize(file)) {
            throw new Error('File size too large');
        }

        formData.append('file', file);
        formData.append('raw_convert', 'google_speech:es-ES');
        store.setStatus(store.status.PROCESSING);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        store.$patch({
            video: data,
        });

        store.setStatus(store.status.READY);
    } catch (error) {
        Notify({
            type: "danger",
            position: 'bottom-center',
            title: error.message,
            duration: 5000,
        })
        console.error(error);
    }
}

const getFile = async url => {
    // Download file from url
    const res = await fetch(url);
    const blob = await res.blob();
    const file = new File([blob], 'video.mp4', { type: 'video/mp4' });
    // Upload file
    uploadFile(file);
}

onMounted(() => {
    const myDropzone = new Dropzone(formRef.value, {
        autoProcessQueue: false,
        acceptedFiles,
        maxFilesize: 10,
    });
    myDropzone.on('addedfile', async (file) => {
        await uploadFile(file)
        myDropzone.removeAllFiles();
    });
});
</script>

<template>
    <template v-if="store.currentStatus === store.status.INIT">
        <form enctype="multipart/form-data" ref="formRef" action="/api/upload"
            class="border-dashed border-2 border-gray-300 aspect-video p-4 rounded flex items-center justify-center flex-col cursor-pointer">
            <span class="pointer-events-none select-none">Click or drag and drop your video here</span>
            <span class="pointer-events-none select-none">Max file size: 10MB</span>
        </form>
        <p class="mt-4">Or try one of these:</p>
        <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="relative cursor-pointer" @click="getFile('/friday.mp4')">
                <video class="aspect-video opacity-75" src="/friday.mp4"></video>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                    stroke="#0d6efd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
            </div>
            <div class="relative cursor-pointer" @click="getFile('/zoo.mp4')">
                <video class="aspect-video opacity-75" src="/zoo.mp4"></video>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                    stroke="#0d6efd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
            </div>
        </div>
    </template>
    <div v-else-if="store.currentStatus === store.status.PROCESSING" class="flex flex-col items-center justify-center">
        <EllipsisLoading />
        <p class="text-center font-bold">Processing video...</p>
    </div>
</template>

<style scoped>
.dz-drag-hover {
    border-color: #0d6efd;
}
</style>