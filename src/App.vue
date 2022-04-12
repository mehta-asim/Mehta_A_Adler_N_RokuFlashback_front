<template>
  <section class="app-wrapper">
    <header>
      <section class="header-image">
        <img src="@/assets/images/roku-light.svg" alt="roku flashback logo" />

        <img
          v-if="authenticated"
          id="hamburger-icon"
          @click="showNav"
          src="@/assets/images/hamburger-menu.svg"
          alt="menu icon with 3 horizontal bars"
        />
      </section>
      <nav class="navigation">
        <ul id="site-nav" v-if="authenticated">
          <li @click="changePage">Home</li>
          <li @click="changePage">Music</li>
          <li @click="changePage">Movies</li>
          <li @click="changePage">TV Shows</li>
        </ul>
        <ul id="control-nav" v-if="authenticated">
          <li @click="switchUser" v-if="allowed">
            <img :src="require('@/assets/images/avatar.jpg')" alt="avatar" />
          </li>

          <li v-if="allowed"><i class="fas fa-cog"></i></li>

          <li @click="logOut"><i class="fas fa-power-off"></i></li>
        </ul>
      </nav>
    </header>
    <router-view @setauth="setAuthenticated" @setallow="setAllowed" />
    <footer>
      <ul class="footer-nav">
        <li>Privacy Policy</li>
        <li>Subscriber Agreement</li>
        <li>Help</li>
        <li>About Us</li>
        <li>Supported Devices</li>
      </ul>
      <h3>Roku Flashback. All Rights Reserved.</h3>
    </footer>
  </section>
</template>

<style lang="scss">
@import "@/assets/sass/main.scss";
</style>

<script>
export default {
  name: "RokuFlashbackApp",

  data() {
    return {
      authenticated: false,
      allowed: false,
    };
  },

  created() {
    if (window.localStorage.getItem("currentUser")) {
      this.setAuthenticated(true);

      this.$router.push({
        name: "UserHome",
        params: JSON.parse(localStorage.getItem("currentUser")),
      });
    }
  },

  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },

    setAllowed(permission) {
      if (permission > 1) {
        this.allowed = true;
      } else {
        this.allowed = false;
      }
    },

    switchUser() {
      this.$router.push({ name: "UserSelect" });
    },

    logOut() {
      if (window.localStorage.getItem("currentUser")) {
        localStorage.removeItem("currentUser");
      }

      let body = document.querySelector("body");
      body.classList.remove("kids");
      body.classList.add("default");

      this.setAuthenticated(false);
      this.$router.push({ path: "/" });
      let nav = document.querySelector(".navigation");
      nav.style.display = "none";
    },

    showNav() {
      let nav = document.querySelector(".navigation");
      if (nav.style.display == "none") {
        nav.style.display = "flex";
      } else {
        nav.style.display = "none";
      }
    },

    stopCurrentAudio() {
      let audio = document.querySelector("audio");
      audio.volume = 0;
      audio.pause();
      audio.currentTime = 0;
    },

    stopCurrentVideo() {
      let video = document.querySelector("video");
      video.volume = 0;
      video.pause();
      video.currentTime = 0;
    },

    changePage(event) {
      if (document.querySelector("video")) {
        this.stopCurrentVideo();
      }
      if (document.querySelector("audio")) {
        this.stopCurrentAudio();
      }
      let page = event.target.textContent;

      switch (page) {
        case "Home":
          this.$router.push({
            name: "UserHome",
            params: JSON.parse(localStorage.getItem("currentUser")),
          });
          break;

        case "Music":
          this.$router.push({
            name: "MusicHome",
            params: JSON.parse(localStorage.getItem("currentUser")),
          });
          break;

        case "Movies":
          this.$router.push({
            name: "MovieHome",
            params: JSON.parse(localStorage.getItem("currentUser")),
          });
          break;

        case "TV Shows":
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
};
</script>

<style lang="scss">
@import "@/assets/sass/moviehome.scss";
</style>

