import { defineStore } from "pinia";

export const useVideoStore = defineStore("video", {
  state: () => ({
    video: null,
    status: {
      INIT: "INIT",
      PROCESSING: "PROCESSING",
      READY: "READY",
      FAILED: "FAILED",
    },
    currentStatus: "INIT",
  }),
  actions: {
    setStatus(status) {
      this.currentStatus = status;
    },
  },
});
