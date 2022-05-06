<template>
  <div
    v-if="totalAmountOfReviewers > 0"
    class="c-product-ratings"
    :class="className"
  >
    <a
      :href="url"
      class="c-product-ratings__link"
    >
      <span class="c-product-ratings__stars">
        {{ stars }}
      </span>
      <span class="c-product-ratings__total-reviewers">
        ({{ totalAmountOfReviewers }})
      </span>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'RatingsWithLink',

    props: {
      stars: {
        type: String,
        required: false
      },

      totalAmountOfReviewers: {
        type: Number,
        required: true
      },

      productUrl: {
        type: String,
        required: true
      },

      className: {
        type: String,
        required: false
      }
    },

    computed: {
      url () {
        return `${this.productUrl}#skip_link-reviews`;
      }
    }
  };
</script>

<style lang="scss" src="./ratings-with-link.scss" />
