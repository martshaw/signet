<template>
  <button
    class="c-quick-view-button c-btn t-primary-btn"
    :class="className"
    @click="buttonClick"
  >
    Quick View
  </button>
</template>

<script>
  export default {
    name: 'QuickViewButton',

    props: {
      className: {
        type: String,
        required: false
      }
    },

    methods: {
      buttonClick: function (value) {
        this.$emit('click', value);
      }
    }
  };
</script>
