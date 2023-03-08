<script>
import { videoPlayer } from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videoPlayer("doc-player", {
      cloud_name: "dbcud3ejg",
    });
    this.player.source(this.options.source, {
      sourceTypes: ["hls"],
      textTracks: {
        subtitles: [this.options.track],
      },
      transformation: {
        streaming_profile: "hd",
      },
    });
  },
};
</script>

<template>
  <div class="max-w-[800px]">
    <video id="doc-player" controls muted class="cld-video-player cld-fluid">
      <track
        kind="subtitles"
        :src="options.track.url"
        :srclang="options.track.language"
        :label="options.track.label"
        default
      />
    </video>
  </div>
</template>
