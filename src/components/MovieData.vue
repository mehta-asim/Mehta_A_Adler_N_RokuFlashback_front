<template>
  <article class="text-wrapper">
    <h1>{{ movies_title }}</h1>
    <section class="selected-movie">
      <MoviePlayer :movies_trailer="movies_trailer"></MoviePlayer>
    </section>
    <div class="release-details">
      <h4>{{ movies_year }}</h4>
      <h4>{{ category_name }}</h4>
      <h4>{{ agerating_name }}</h4>
      <h4>{{ movies_runtime }}</h4>
    </div>
    <p>{{ movies_description }}</p>
  </article>
</template>

<script>
import MoviePlayer from "@/components/MoviePlayer.vue";
export default {
  name: "TheMovieData",

  props: {
    movies_title: String,
    movies_description: String,
    movies_runtime: String,
    movies_year: String,
    category_name: String,
    agerating_name: String,
    first_name: String,
    permissions: String,
    avatar: String,
    movies_trailer: String,
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
    MoviePlayer,
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/moviedata.scss";
</style>
