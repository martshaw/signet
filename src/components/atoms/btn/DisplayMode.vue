<template>
  <button @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'DisplayMode'
  });
</script>
