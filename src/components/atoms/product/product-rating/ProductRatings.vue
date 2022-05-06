<template>
  <div class="product-ratings">
    <span class="product-ratings__stars">
      {{ stars }}
    </span>

    ({{ totalAmountOfReviewers }})
  </div>
</template>

<script>
// @ts-check

  export default {
    name: 'ProductRatings',

    props: {
      stars: {
        type: String,
        required: false
      },

      totalAmountOfReviewers: {
        type: Number,
        required: true
      }
    }
  };
</script>
