<template>
  <div
    class="c-long-description"
    :class="className"
  >
    <p class="c-long-description__intro-text">
      {{ description }}
    </p>
    <a
      class="c-long-description__read-more"
      :href="url"
    >
      Read More >>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'LongDescription',

    props: {
      description: {
        type: String,
        required: true
      },

      url: {
        type: String,
        required: true
      },

      className: {
        type: Array,
        required: false
      }
    }
  };
</script>

<style lang="scss" src="./long-description.scss"/>
