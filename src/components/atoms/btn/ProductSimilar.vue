<template>
  <button
    class="
      c-product-similar
      syte-discovery
      syte-button"
    :data-image-src="srcImg + '-745.jpg'"
    data-placement="product-list-page"
    :data-sku="sku"
  >
    <img
      src="//d2r6ga9xnxj9b6.cloudfront.net/icons/syte/syte-v2.svg"
      class="syte-button__icon"
      aria-hidden="true"
      alt=""
    />
    <span
      class="syte-button__label"
    >
      Shop similar
    </span>
  </button>
</template>

<script>
  export default {
    name: 'ProductSimilar',
    props: {
      srcImg: {
        type: String,
        required: true
      },
      sku: {
        type: Number,
        required: true
      }
    }
  };
</script>
