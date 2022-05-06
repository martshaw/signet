<template>
  <button @click="$emit('click')">
    Apply Filter
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'ApplyFilter'
  });
</script>
