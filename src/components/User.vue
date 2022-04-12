<template>
  <article>
    <div @click="navToHome">
      <img :src="require('@/assets/images/' + user.avatar)" alt="avatar" />
      <h2>{{ user.first_name }}</h2>
    </div>
  </article>
</template>

<script>
export default {
  name: "TheUserComponent",

  props: {
    user: Object,
  },

  methods: {
    navToHome() {
      this.$router.push({
        name: "UserHome",
        params: this.user,
      });
    },
  },
};
</script>
