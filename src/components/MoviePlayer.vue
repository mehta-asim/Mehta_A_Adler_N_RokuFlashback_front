<template>
  <video
    controls
    muted
    v-if="movies_trailer"
    :src="require('@/assets/videos/' + movies_trailer)"
    @canplaythrough="playVideo"
  ></video>
</template>

<script>
export default {
  name: "MoviePlayer",

  props: {
    movies_trailer: String,
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
