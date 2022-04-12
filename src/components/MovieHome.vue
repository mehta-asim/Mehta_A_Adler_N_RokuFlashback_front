<template>
  <section class="movie-home">
    <section id="movie-home-title">MOVIES</section>

    <section class="current-movie">
      <MoviePlayer :movies_trailer="randomMovie.movies_trailer"></MoviePlayer>
    </section>

    <section class="movie-playlist">
      <section id="movie-playlist-title">
        <h4>YOUR PLAYLIST</h4>
      </section>

      <section id="movie-playlist-thumbs">
        <MovieThumb
          v-for="movie in movies"
          :key="movie.movies_id"
          :thumb="movie.movies_cover"
          @click="setCurrentMovie(movie)"
        />
      </section>
    </section>

    <section class="movie-playlist">
      <section id="movie-playlist-title">
        <h4>RECOMMENDED FOR YOU</h4>
      </section>

      <section id="movie-playlist-thumbs">
        <MovieThumb
          v-for="movie in movies"
          :key="movie.movies_id"
          :thumb="movie.movies_cover"
          @click="setCurrentMovie(movie)"
        />
      </section>
    </section>

    <section class="movie-playlist">
      <section id="movie-playlist-title">
        <h4>NEW TO ROKU</h4>
      </section>

      <section id="movie-playlist-thumbs">
        <MovieThumb
          v-for="movie in movies"
          :key="movie.movies_id"
          :thumb="movie.movies_cover"
          @click="setCurrentMovie(movie)"
        />
      </section>
    </section>
  </section>
</template>

<script>
import MoviePlayer from "@/components/MoviePlayer.vue";
import MovieThumb from "@/components/MovieThumb.vue";

export default {
  name: "MovieHome",

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

        this.randomMovie = data[Math.floor(Math.random() * data.length)];
        this.currentMovie = data[Math.floor(Math.random() * data.length)];
        console.log(this.currentMovie);
      })
      .catch((err) => console.error(err));
  },

  data() {
    return {
      movies: [],
      currentMovie: {},
      randomMovie: {},
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
      this.currentMovie.first_name = this.first_name;
      this.currentMovie.avatar = this.avatar;
      this.currentMovie.permissions = this.permissions;
      this.$router.push({
        name: "MovieData",
        params: this.currentMovie,
      });
    },
  },

  components: {
    MovieThumb,
    MoviePlayer,
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/moviehome.scss";
</style>
