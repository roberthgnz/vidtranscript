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
    reset() {
      this.video = null;
      this.currentStatus = this.status.INIT;
    },
    async fetchVideoInfo() {
      const res = await fetch("/api/resource", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assetId: this.video.asset_id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      this.video = data;
    },
  },
});
