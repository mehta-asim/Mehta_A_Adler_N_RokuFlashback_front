<template>
  <section class="episode-home">
    <h1>{{ tv_episode_name }}</h1>
    <section class="selected-episode">
      <TvPlayer :tv_trailer="tv_episode_source" />
    </section>
    <section class="episode-details">
      <h4>{{ tv_episode_runtime }}m</h4>
      <h4>Season {{ tv_season_id }}</h4>
      <h4>Episode {{ tv_episode_number }}</h4>
    </section>
    <p>{{ tv_episode_description }}</p>
  </section>
</template>

<script>
import TvPlayer from "@/components/TvPlayer.vue";

export default {
  name: "EpisodeHome",

  props: {
    tv_episode_name: String,
    tv_episode_description: String,
    tv_episode_runtime: String,
    tv_season_id: String,
    tv_episode_number: String,
    tv_episode_source: String,
    first_name: String,
    permissions: String,
    avatar: String,
  },

  components: {
    TvPlayer,
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
};
</script>

<style lang="scss">
@import "@/assets/sass/episodehome.scss";
</style>
