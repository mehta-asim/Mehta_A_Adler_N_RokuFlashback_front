<template>
  <section class="home">
    <section class="movie-container">
      <MoviePlayer :movies_trailer="currentMovie.movies_trailer"></MoviePlayer>
    </section>

    <section class="center-nav">
      <ul>
        <li @click="goToPage">MOVIES</li>
        <li @click="goToPage">TV SHOWS</li>
        <li @click="goToPage">MUSIC</li>
      </ul>
    </section>

    <section class="thumbs movie">
      <MovieThumb
        v-for="movie in movies"
        :key="movie.movies_id"
        :thumb="movie.movies_cover"
        @click="setCurrentMovie(movie)"
      ></MovieThumb>
    </section>

    <section class="thumbs tv">
      <TvThumb
        v-for="show in tv"
        :key="show.tv_id"
        :thumb="show.tv_cover"
        @click="setCurrentTv(show)"
      ></TvThumb>
    </section>

    <section class="thumbs music">
      <MusicThumb
        v-for="song in music"
        :key="song.music_id"
        :thumb="song.music_cover"
        @click="setCurrentMusic(song)"
      ></MusicThumb>
    </section>
  </section>
</template>


<script>
import MoviePlayer from "@/components/MoviePlayer.vue";
// import MovieData from "@/components/MovieData.vue";
import MovieThumb from "@/components/MovieThumb.vue";
import TvThumb from "@/components/TvThumb.vue";
import MusicThumb from "@/components/MusicThumb.vue";

export default {
  name: "TheUserHomePage",

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

    let nav = document.querySelector(".navigation");
    nav.style.display = "flex";
    this.userData = currentUser;

    let userPermission = {
      permissions: this.permissions,
    };

    if (window.localStorage) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    fetch("/roku_api/movies/getall", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userPermission),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        this.movies = data;

        this.currentMovie = data[Math.floor(Math.random() * data.length)];
      })
      .catch((err) => console.error(err));

    fetch("/roku_api/tv/getall", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userPermission),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        this.tv = data;
      })
      .catch((err) => console.error(err));

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
      })
      .catch((err) => console.error(err));
  },

  data() {
    return {
      movies: [],
      currentMovie: {},
      tv: [],
      currentTv: {},
      music: [],
      currentMusic: {},
      userData: {},
    };
  },

  methods: {
    stopCurrentMovie() {
      let video = document.querySelector("video");
      video.volume = 0;
      video.pause();
      video.currentTime = 0;
    },

    setCurrentMovie(movie) {
      this.stopCurrentMovie();
      this.currentMovie = movie;
      this.currentMovie.first_name = this.userData.first_name;
      this.currentMovie.avatar = this.userData.avatar;
      this.currentMovie.permissions = this.userData.permissions;
      this.$router.push({
        name: "MovieData",
        params: this.currentMovie,
      });
    },
    setCurrentTv(tv) {
      this.stopCurrentMovie();
      this.currentTv = tv;
      this.currentTv.first_name = this.userData.first_name;
      this.currentTv.avatar = this.userData.avatar;
      this.currentTv.permissions = this.userData.permissions;
      this.$router.push({
        name: "TvData",
        params: this.currentTv,
      });
    },

    setCurrentMusic(song) {
      this.stopCurrentMovie();
      this.currentMusic = song;
      this.currentMusic.first_name = this.userData.first_name;
      this.currentMusic.avatar = this.userData.avatar;
      this.currentMusic.permissions = this.userData.permissions;
      this.$router.push({
        name: "MusicData",
        params: this.currentMusic,
      });
    },

    goToPage(event) {
      this.stopCurrentMovie();
      let page = event.target.textContent;

      switch (page) {
        case "MUSIC":
          this.$router.push({
            name: "MusicHome",
            params: JSON.parse(localStorage.getItem("currentUser")),
          });
          break;

        case "MOVIES":
          this.$router.push({
            name: "MovieHome",
            params: JSON.parse(localStorage.getItem("currentUser")),
          });
          break;

        case "TV SHOWS":
          this.$router.push({
            name: "TvHome",
            params: JSON.parse(localStorage.getItem("currentUser")),
          });
          break;

        default:
          this.$router.push({
            name: "UserHome",
            params: JSON.parse(localStorage.getItem("currentUser")),
          });
      }
    },
  },

  components: {
    MoviePlayer,
    MovieThumb,
    TvThumb,
    MusicThumb,
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/homepage.scss";
</style>
