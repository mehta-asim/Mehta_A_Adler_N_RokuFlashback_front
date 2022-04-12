<template>
  <audio
    controls
    muted
    v-if="music_source"
    :src="require('@/assets/audio/' + music_source)"
    @canplaythrough="playAudio"
  ></audio>
</template>

<script>
export default {
  name: "MusicPlayer",

  props: {
    music_source: String,
  },

  methods: {
    playAudio(event) {
      event.currentTarget.muted = false;
      event.currentTarget.volume = 0.1;
      event.currentTarget.play();
    },
  },
};
</script>
