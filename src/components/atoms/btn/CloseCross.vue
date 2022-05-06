<template>
  <button @click="$emit('click')">
    <img
      src="@/assets/images/ticks-and-crosses/black-cross.svg"
      :alt="alt"
      :width="size"
      :height="size"
    />
  </button>
</template>

<script lang="ts">
  /* eslint-disable max-len, vue/max-len */
  // Types

  // Packages
  import Vue from 'vue';

  // Middleware

  // Services

  // Stores

  // Atoms

  // Molecules

  // Organisms
  /* eslint-enable max-len, vue/max-len */

  export default Vue.extend({
    name: 'CloseCross',

    props: {
      size: {
        type: String,
        required: true
      },

      alt: {
        type: String,
        default: 'Close'
      }
    }
  });
</script>
