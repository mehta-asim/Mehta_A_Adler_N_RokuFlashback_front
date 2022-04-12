<template>
  <article class="text-wrapper">
    <h1>{{ music_title }}</h1>
    <section id="music-cover">
      <img
        :src="require('@/assets/images/music/' + music_cover)"
        alt="media thumb"
      />
    </section>
    <section class="selected-music">
      <MusicPlayer :music_source="music_source"></MusicPlayer>
    </section>
    <div class="release-details">
      <h4>{{ music_artist }}</h4>
      <h4>{{ music_year }}</h4>
      <h4>{{ category_name }}</h4>
    </div>
  </article>
</template>

<script>
import MusicPlayer from "@/components/MusicPlayer.vue";

export default {
  name: "TheMusicData",

  props: {
    music_cover: String,
    music_source: String,
    music_title: String,
    music_artist: String,
    music_year: String,
    category_name: String,
    first_name: String,
    permissions: String,
    avatar: String,
  },

  created() {
    let currentUser = {
      first_name: this.first_name,
      permissions: this.permissions,
      avatar: this.avatar,
    };

    if (window.localStorage) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  },

  components: {
    MusicPlayer,
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/musicdata.scss";
</style>
