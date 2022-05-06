<template>
  <div
    class="c-product-gallery"
    :class="className"
  >
    <splide
      :options="options"
      :slides="productGallery"
      class="c-product-gallery__splide"
      has-slider-wrapper
      @splide:arrows:updated="onArrowsUpdated"
    >
      <splide-slide
        v-for="slide in productGallery.images"
        :key="slide.src"
      >
        <product-image
          :src="slide.src"
          :name="name"
          :sku="sku"
          :url="url"
          :class-name="'c-product-gallery__image'"
        ></product-image>
      </splide-slide>
      <splide-slide
        v-if="showSpinset"
      >
        <product-spinset
          :spinset="productGallery.spinset"
          :name="name"
          :sku="childSku"
          :url="url"
        >
        </product-spinset>
      </splide-slide>
      <splide-slide
        v-for="video in productGallery.videos"
        :key="video.video"
      >
        <product-video
          :video="video"
          :class-name="'c-product-gallery__video'"
        >
        </product-video>
      </splide-slide>
    </splide>
  </div>
</template>

<script>
  import { Splide, SplideSlide } from '@splidejs/vue-splide';
  import '@splidejs/splide/dist/css/themes/splide-default.min.css';
  import ProductImage from '@/components/atoms/product/ProductImage';
  import ProductSpinset from
    '@/components/molecules/product-spinset/ProductSpinset';
  import ProductVideo from
    '@/components/molecules/product-video/ProductVideo';

  export default {
    name: 'ProductGallery',

    components: {
      Splide,
      SplideSlide,
      ProductImage,
      ProductSpinset,
      ProductVideo
    },

    props: {
      gallery: {
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
          autoWidth: true,
          autoHeight: true,
          perPage: 1,
          arrows: false,
          pagination: false,
          gap: '1rem',
          classes: {
            arrow: 'splide__arrow c-product-gallery__splide__arrow',
            prev: 'splide__arrow--prev c-product-gallery__splide__arrow--prev',
            next: 'splide__arrow--next c-product-gallery__splide__arrow--next',
            pagination: 'splide__pagination ' +
              'c-product-gallery__splide__pagination',
            page:
              'splide__pagination__page ' +
              'c-product-gallery__splide__pagination__page'
          }
        },
        showSpinset: false
      };
    },

    computed: {
      productGallery () {
        return this.prepareProductGallery();
      }
    },

    created () {
      const elements = this.prepareProductGallery();
      const totalElementsCount = (elements.images.length +
        elements.videos.length + elements.spinset.length);
      if (totalElementsCount > 1) {
        this.options.arrows = true;
        this.options.pagination = true;
      }
      this.showSpinset = (elements.spinset.length > 0);
    },

    methods: {
      prepareProductGallery () {
        const images = [];
        const videos = [];
        const spinset = [];

        if (this.gallery.bremontConfiguratorImagesSrc) {
          images.push({ src: this.gallery.bremontConfiguratorImagesSrc });
        } else {
          images.push({ src: this.gallery.mainSrc });
        }
        if (this.gallery.bremontAlternates.length) {
          this.gallery.bremontAlternates.forEach(
            image => images.push({ src: image }));
        } else {
          this.gallery.imageAlternates.forEach(
            image => images.push({ src: image }));
        }
        Array.isArray(this.gallery.spinset) &&
          this.gallery.spinset.forEach(item => spinset.push(item));
        this.gallery.videos.forEach(video => videos.push(video));
        return { images, spinset, videos };
      },

      /**
       * Executed whenever status of arrows are updated.
       * Hides previous arrow of first slide and next arrow of last slide
       * @param {Component} splide - Instance of Splide component
       * @param {HTMLButtonElement} prev - HTML button of previous arrow
       * @param {HTMLButtonElement} next - HTML button of next arrow
       * @param {Number} prevIndex - Index number of active prev arrow
       * @param {Number} nextIndex - Index number of active next arrow
       */
      onArrowsUpdated (splide, prev, next, prevIndex, nextIndex) {
        if (prevIndex === -1) {
          prev.classList.add('c-product-gallery__splide__arrow--hidden');
        } else {
          prev.classList.remove('c-product-gallery__splide__arrow--hidden');
        }

        if (nextIndex === -1) {
          next.classList.add('c-product-gallery__splide__arrow--hidden');
        } else {
          next.classList.remove('c-product-gallery__splide__arrow--hidden');
        }
      }
    }
  };
</script>

<style lang="scss" src="./product-gallery.scss"/>
