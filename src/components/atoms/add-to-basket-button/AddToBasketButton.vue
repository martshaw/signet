<template>
  <button
    class="c-add-to-basket-button c-btn t-black-btn"
    :class="className"
    :disabled="!availableToBuyWeb"
    @click="buttonClick"
  >
    {{ buttonText }}
  </button>
</template>

<script>
  export default {
    name: 'AddToBasketButton',

    props: {
      className: {
        type: String,
        required: false
      },
      availableToBuyWeb: {
        type: Boolean,
        required: true
      },
      buttonText: {
        type: String,
        required: true
      }
    },

    methods: {
      buttonClick: function (value) {
        this.$emit('click', value);
      }
    }
  };
</script>

<style lang="scss" src="./add-to-basket-button.scss"/>
