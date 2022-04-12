<template>
  <section class="season-wrapper ishidden">
    <TheEpisode
      v-for="(episode, number) in season_episodes"
      :key="number"
      :id="number"
      :episode="episode"
    />
  </section>
</template>

<script>
import TheEpisode from "@/components/TheEpisode.vue";

export default {
  name: "TheSeason",

  props: {
    first_name: String,
    permissions: String,
    avatar: String,
    episodes: Array,
  },

  data() {
    return {
      season_episodes: [],
      user: {},
    };
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

    this.season_episodes = Object.values(this.episodes);
    this.season_episodes.forEach((element) => {
      element.first_name = this.first_name;
      element.permissions = this.permissions;
      element.avatar = this.avatar;
    });
  },

  components: {
    TheEpisode,
  },
};
</script>
