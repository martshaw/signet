<template>
  <button @click="$emit('click')">
    Filter

    <img
      src="@/assets/images/controls/filter-toggle.svg"
      alt=""
      width="23"
      height="22"
      loading="lazy"
    />
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'FilterSwitch'
  });
</script>
