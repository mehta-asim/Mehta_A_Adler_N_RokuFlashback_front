<template>
  <video
    controls
    muted
    v-if="tv_trailer"
    :src="require('@/assets/videos/tv/' + tv_trailer)"
    @canplaythrough="playVideo"
  ></video>
</template>

<script>
export default {
  name: "TvPlayer",

  props: {
    tv_trailer: String,
  },

  methods: {
    playVideo(event) {
      event.currentTarget.muted = false;
      event.currentTarget.volume = 0.1;
      event.currentTarget.play();
    },
  },
};
</script>
