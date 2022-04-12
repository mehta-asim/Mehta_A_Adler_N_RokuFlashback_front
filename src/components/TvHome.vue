<template>
  <section class="tv-home">
    <section id="tv-home-title">TV SHOWS</section>

    <section class="current-tv">
      <TvPlayer :tv_trailer="randomTv.tv_trailer"></TvPlayer>
    </section>

    <section class="tv-playlist">
      <section id="tv-playlist-title">
        <h4>YOUR PLAYLIST</h4>
      </section>

      <section id="tv-playlist-thumbs">
        <TvThumb
          v-for="show in tv"
          :key="show.tv_id"
          :thumb="show.tv_cover"
          @click="setCurrentTv(show)"
        />
      </section>
    </section>

    <section class="tv-playlist">
      <section id="tv-playlist-title">
        <h4>RECOMMENDED FOR YOU</h4>
      </section>

      <section id="tv-playlist-thumbs">
        <TvThumb
          v-for="show in tv"
          :key="show.tv_id"
          :thumb="show.tv_cover"
          @click="setCurrentTv(show)"
        />
      </section>
    </section>

    <section class="tv-playlist">
      <section id="tv-playlist-title">
        <h4>NEW TO ROKU</h4>
      </section>

      <section id="tv-playlist-thumbs">
        <TvThumb
          v-for="show in tv"
          :key="show.tv_id"
          :thumb="show.tv_cover"
          @click="setCurrentTv(show)"
        />
      </section>
    </section>
  </section>
</template>

<script>
import TvPlayer from "@/components/TvPlayer.vue";
import TvThumb from "@/components/TvThumb.vue";

export default {
  name: "TvHome",

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

    fetch("/roku_api/tv/getall", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userPermission),
    })
      .then((res) => res.json())
      .then((data) => {
        this.tv = data;
        this.randomTv = data[Math.floor(Math.random() * data.length)];
        this.currentTv = data[Math.floor(Math.random() * data.length)];
      })
      .catch((err) => console.error(err));
  },

  data() {
    return {
      tv: [],
      currentTv: {},
      randomTv: {},
    };
  },

  methods: {
    stopCurrentTv() {
      let video = document.querySelector("video");
      video.volume = 0;
      video.pause();
      video.currentTime = 0;
    },
    setCurrentTv(show) {
      this.stopCurrentTv();
      this.currentTv = show;
      this.currentTv.first_name = this.first_name;
      this.currentTv.avatar = this.avatar;
      this.currentTv.permissions = this.permissions;
      this.$router.push({
        name: "TvData",
        params: this.currentTv,
      });
    },
  },

  components: {
    TvThumb,
    TvPlayer,
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/tvhome.scss";
</style>
