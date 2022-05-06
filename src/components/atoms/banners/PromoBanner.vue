<template>
  <section>
    <a
      :href="banner.linkURL"
      class="promo-banner__link"
    >
      <picture>
        <source
          :srcset="banner.imageURL"
          media="(min-width: 720px)"
        />
        <img
          :src="banner.mobileImageURL"
          :alt="banner.imageAltText"
          class="promo-banner__image"
        />
      </picture>

      <span
        v-if="banner.callToAction"
        class="promo-banner__dumb-cta"
        :style="ctaStyles"
      >
        {{ banner.callToAction }}
      </span>
    </a>
  </section>
</template>

<script lang="ts">
  /* eslint-disable max-len, vue/max-len */
  // Types
  import type { State } from '@/store/modules/product-list-page/state';

  // Packages
  import Vue, { PropType } from 'vue';

  // Middleware

  // Services

  // Stores

  // Atoms

  // Molecules

  // Organisms
  /* eslint-enable max-len, vue/max-len */

  export default Vue.extend({
    name: 'PromoBanner',

    props: {
      banner: {
        type: Object as PropType<State['mainBanner']>,
        required: true
      }
    },

    computed: {
      ctaStyles () {
        const banner: State['mainBanner'] = this.banner;

        return {
          color: banner.ctaTextColour || 'black',
          background: banner.ctaFillColour || 'transparent',
          [banner.ctaPosition || 'right']: '0.75rem'
        };
      }
    }
  });
</script>
