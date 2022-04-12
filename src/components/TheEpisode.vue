<template>
  <section class="episode-wrapper" @click="showEpisode()">
    <h4>{{ episode.tv_episode_number }} {{ episode.tv_episode_name }}</h4>
    <h5>{{ episode.tv_episode_runtime }}m</h5>
    <p>{{ episode.tv_episode_description }}</p>
  </section>
</template>

<script>
export default {
  name: "TheEpisode",

  props: {
    episode: Object,
    first_name: String,
    permissions: String,
    avatar: String,
  },

  data() {
    return {
      currentEpisode: {},
    };
  },

  created() {
    let currentUser = {
      first_name: this.currentEpisode.first_name,
      permissions: this.currentEpisode.permissions,
      avatar: this.currentEpisode.avatar,
    };

    if (window.localStorage) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  },

  methods: {
    showEpisode() {
      this.$router.push({
        name: "EpisodeHome",
        params: this.episode,
      });
    },
  },
};
</script>
