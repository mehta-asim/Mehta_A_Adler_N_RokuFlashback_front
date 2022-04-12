<template>
  <div class="thumb-wrapper">
    <img :src="require('@/assets/images/tv/' + thumb)" alt="media thumb" />
  </div>
</template>

<script>
export default {
  name: "TheTvThumb",

  props: {
    thumb: String,
  },
};
</script>
