<template>
  <section class="music-home">
    <section id="music-home-title">MUSIC</section>

    <section class="current-music">
      <MusicPlayer :music_source="randomMusic.music_source"></MusicPlayer>
    </section>

    <section class="music-playlist">
      <section id="music-playlist-title">
        <h4>YOUR PLAYLIST</h4>
      </section>

      <section id="music-playlist-thumbs">
        <MusicThumb
          v-for="song in music"
          :key="song.music_id"
          :thumb="song.music_cover"
          @click="setCurrentMusic(song)"
        />
      </section>
    </section>

    <section class="music-playlist">
      <section id="music-playlist-title">
        <h4>RECOMMENDED FOR YOU</h4>
      </section>

      <section id="music-playlist-thumbs">
        <MusicThumb
          v-for="song in music"
          :key="song.music_id"
          :thumb="song.music_cover"
          @click="setCurrentMusic(song)"
        />
      </section>
    </section>

    <section class="music-playlist">
      <section id="music-playlist-title">
        <h4>NEW TO ROKU</h4>
      </section>

      <section id="music-playlist-thumbs">
        <MusicThumb
          v-for="song in music"
          :key="song.music_id"
          :thumb="song.music_cover"
          @click="setCurrentMusic(song)"
        />
      </section>
    </section>
  </section>
</template>

<script>
import MusicPlayer from "@/components/MusicPlayer.vue";
import MusicThumb from "@/components/MusicThumb.vue";

export default {
  name: "MusicHome",

  props: {
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

    let userPermission = {
      permissions: this.permissions,
    };
    if (window.localStorage) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    fetch("/roku_api/music/getall", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userPermission),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        this.music = data;

        this.randomMusic = data[Math.floor(Math.random() * data.length)];
        this.currentMusic = data[Math.floor(Math.random() * data.length)];
        console.log(this.currentMovie);
      })
      .catch((err) => console.error(err));
  },

  data() {
    return {
      music: [],
      currentMusic: {},
      randomMusic: {},
    };
  },

  methods: {
    stopCurrentMusic() {
      let audio = document.querySelector("audio");
      audio.volume = 0;
      audio.pause();
      audio.currentTime = 0;
    },
    setCurrentMusic(song) {
      this.stopCurrentMusic();
      this.currentMusic = song;
      this.currentMusic.first_name = this.first_name;
      this.currentMusic.avatar = this.avatar;
      this.currentMusic.permissions = this.permissions;
      this.$router.push({
        name: "MusicData",
        params: this.currentMusic,
      });
    },
  },

  components: {
    MusicThumb,
    MusicPlayer,
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/musichome.scss";
</style>
