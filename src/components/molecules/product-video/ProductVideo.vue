<template>
  <div
    class="c-product-video"
    :class="className"
  >
    <video
      class="c-product-video__video"
      :poster="`${video.poster}.png`"
      controls
    >
      <source
        :src="`${video.video}.webm`"
        type="video/webm"
      />
      <source
        :src="`${video.video}.mp4`"
        type="video/mp4"
      />
    </video>
  </div>
</template>

<script>
  export default {
    name: 'ProductVideo',

    props: {
      video: {
        type: Object,
        required: true
      },
      className: {
        type: String,
        required: false
      }
    }
  };
</script>

<style lang="scss" src="./product-video.scss"/>
