<template>
  <div class="thumb-wrapper">
    <img :src="require('@/assets/images/music/' + thumb)" alt="media thumb" />
  </div>
</template>

<script>
export default {
  name: "TheMusicThumb",

  props: {
    thumb: String,
  },
};
</script>
