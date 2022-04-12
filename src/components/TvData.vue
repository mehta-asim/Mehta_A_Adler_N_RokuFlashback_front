<template>
  <article class="text-wrapper">
    <h1>{{ tv_title }}</h1>
    <section class="selected-tv">
      <TvPlayer :tv_trailer="tv_trailer"></TvPlayer>
    </section>
    <div class="release-details">
      <h4>{{ category_name }}</h4>
      <h4>{{ tv_seasons }} Seasons</h4>
      <h4>{{ agerating_name }}</h4>
      <h4>{{ tv_year }}</h4>
    </div>
    <p>{{ tv_description }}</p>
    <select name="season-filter" id="season-filter" @change="showSeason">
      <option
        v-for="(episodes, index) in all_episodes"
        :key="index"
        :value="index"
      >
        Season {{ index }}
      </option>
    </select>
    <TheSeason
      v-for="(episodes, index) in all_episodes"
      :key="index"
      :class="index"
      :episodes="episodes"
      :first_name="this.first_name"
      :permissions="this.permissions"
      :avatar="this.avatar"
    />
  </article>
</template>

<script>
import TvPlayer from "@/components/TvPlayer.vue";
import TheSeason from "@/components/TheSeason.vue";
export default {
  name: "TheTvData",

  props: {
    tv_cover: String,
    tv_trailer: String,
    tv_id: String,
    tv_title: String,
    tv_description: String,
    tv_seasons: String,
    tv_year: String,
    category_name: String,
    agerating_name: String,
    tv_episodes: String,
    first_name: String,
    permissions: String,
    avatar: String,
  },

  data() {
    return {
      all_episodes: [],
      currentEpisode: {},
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

    let tvId = {
      tv_id: this.tv_id,
    };

    fetch("/roku_api/tv/getone", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tvId),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        this.all_episodes = JSON.parse(data[0].tv_episodes);
      })
      .catch((err) => console.error(err));
  },

  updated() {
    let all_seasons = document.querySelectorAll(".season-wrapper");
    all_seasons.forEach((element) => {
      console.log(element);
      if (element.classList.contains("1")) {
        element.classList.remove("ishidden");
      }
    });
  },

  methods: {
    stopCurrentTv() {
      let video = document.querySelector("video");
      video.volume = 0;
      video.pause();
      video.currentTime = 0;
    },
    showSeason(event) {
      let total_seasons = document.querySelectorAll(".season-wrapper");
      console.log(total_seasons);
      total_seasons.forEach((element) => {
        console.log(element);
        if (element.classList.contains(event.target.value)) {
          element.classList.remove("ishidden");
        } else {
          if (!element.classList.contains("ishidden")) {
            element.classList.add("ishidden");
          }
        }
      });
    },

    showEpisode(episode) {
      this.stopCurrentTv();
      this.currentEpisode = episode;
      this.currentEpisode.first_name = this.first_name;
      this.currentEpisode.avatar = this.avatar;
      this.currentEpisode.permissions = this.permissions;
      this.$router.push({
        name: "EpisodeHome",
        params: this.currentEpisode,
      });
    },
  },

  components: {
    TheSeason,
    TvPlayer,
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/tvdata.scss";
</style>
