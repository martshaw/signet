<template>
  <div
    class="c-product-spinset"
    :class="className"
  >
    <splide
      :options="options"
      class="c-product-spinset__splide"
    >
      <splide-slide
        v-for="slide in spinset"
        :key="slide"
      >
        <product-image
          :src="slide"
          :name="name"
          :sku="sku"
          :url="url"
          :class-name="'c-product-spinset__product_image'"
        ></product-image>
      </splide-slide>
    </splide>
  </div>
</template>

<script>
  import { Splide, SplideSlide } from '@splidejs/vue-splide';
  import '@splidejs/splide/dist/css/themes/splide-default.min.css';
  import ProductImage from '@/components/atoms/product/ProductImage';

  export default {
    name: 'ProductSpinset',

    components: {
      Splide,
      SplideSlide,
      ProductImage
    },

    props: {
      spinset: {
        type: Object,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      sku: {
        type: Number,
        required: true
      },
      url: {
        type: URL,
        required: true
      },
      className: {
        type: String,
        required: false
      }
    },

    data () {
      return {
        options: {
          autoplay: true,
          interval: 20,
          type: 'loop',
          autoWidth: true,
          autoHeight: true,
          speed: 1,
          perMove: 1,
          arrows: false,
          pagination: false,
          pauseOnHover: false,
          pauseOnFocus: false
        }
      };
    }
  };
</script>

<style lang="scss" src="./product-spinset.scss"/>
