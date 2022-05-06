<template>
  <div
    :key="banner.indexPosition"
    class="banner-card"
  >
    <img
      :src="banner.backgroundImage"
      :alt="banner.heading"
      class="banner-card__img"
    />
    <div class="banner-card__content">
      <span class="banner-card__title">
        {{ banner.heading }}
      </span>
      <p class="banner-card__info">
        {{ banner.text }}
      </p>
      <a
        class="c-btn t-primary-btn banner-card__btn"
        :href="banner.buttonAction"
        target="_blank"
      >
        {{ banner.button }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  /* eslint-disable vue/max-len, max-len */

  // Types
  import { InGridBanners } from '@/@types/in-grid-banners';

  // Packages
  import Vue, { PropType } from 'vue';
  /* eslint-enable max-len, vue/max-len */

  export default Vue.extend({
    name: 'IngridBanner',
    props: {
      banner: {
        type: Object as PropType<InGridBanners>,
        required: true
      }
    }
  });
</script>
