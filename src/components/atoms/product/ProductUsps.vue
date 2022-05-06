<template>
  <ul class="product-usps">
    <li
      v-for="usp in usps"
      :key="usp"
      class="product-usps__item"
    >
      {{ usp }}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'ProductUsps',
    components: {},
    props: {
      usps: {
        type: Array,
        required: false
      }
    }
  };
</script>
