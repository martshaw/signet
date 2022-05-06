<template>
  <ais-instant-search
    :search-client="searchClient"
    :index-name="indexName"
    :routing="routing"
    :middlewares="middlewares"
  >
    <!-- This looks to be sending a request -->
    <ais-configure
      :filters="facetFilters"
      :faceting-after-distinct.camel="true"
    />
    <!--
      We have to have this search box otherwise search query's don't work
     -->
    <ais-search-box hidden />
    <promo-banner
      v-if="readMainBanner.imageURL"
      :banner="readMainBanner"
      class="promo-banner"
    />

    <div
      class="list-page"
      :class="listPageClasses"
    >
      <div class="page-info">
        <h1 class="page-info__title">
          {{ pageHeading }}
        </h1>

        <close-cross
          size="20"
          class="close-refinements"
          @click="closeRefinements"
        />

        <p
          v-if="readSeoBanner.intro"
          class="page-info__text"
        >
          {{ readSeoBanner.intro }}

          <a
            v-if="readSeoBanner.body"
            href="#seoBanner"
            class="page-info__jump"
          >
            Read more
          </a>
        </p>
        <quick-links
          v-if="quickLinks"
          :links="quickLinks"
        />
      </div>
      <top-section
        :excluded-attributes="clearRefinementsIgnoreList"
        @analyticsFilterInteraction="filterInteraction"
      />

      <product-facets
        ref="facets"
        :excluded-attributes="clearRefinementsIgnoreList"
        @analyticsResultsInteraction="resultsInteraction"
      />

      <!-- The ais-infinite-hits are sending a request as well -->
      <ais-infinite-hits
        :escape-h-t-m-l="false"
        :transform-items="transformProducts"
        class="products"
        :class="productClassObj"
      >
        <template v-slot="{items, results, isLastPage, refineNext}">
          <template v-for="(product, index) in items">
            <in-grid
              v-if="showInGridBanners(index)"
              :key="`${product.parentSku}-banner`"
              :banner="getInGridBanners(index)"
            />

            <list-card
              :key="product.parentSku"
              :product="product"
              :position="index"
              :results="results"
              :corner-flags-rules="cornerFlags"
            />
          </template>

          <button
            v-show="!isLastPage"
            class="c-btn t-black-btn load-more-btn"
            @click="refineNext"
          >
            Show more results
          </button>

          <ais-state-results v-show="items.length === 0">
            <template
              v-slot="{state: {query}}"
            >
              Sorry, we can't find results for "{{ query }}"
            </template>
          </ais-state-results>
        </template>
      </ais-infinite-hits>

      <seo-banner
        v-if="readSeoBanner.body"
        id="seoBanner"
        ref="seoBanner"
        class="seo-banner"
      >
        <template #heading>
          <h2 class="seo-banner__title">
            {{ readSeoBanner.title }}
          </h2>
        </template>

        <template #body>
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="seo-banner__content"
            v-html="readSeoBanner.body"
          />
          <!-- eslint-enable vue/no-v-html -->
        </template>
      </seo-banner>
    </div>

    <quick-view v-if="isWeb" />
  </ais-instant-search>
</template>

<script lang="ts">
  /* eslint-disable vue/max-len, max-len */
  // Types
  import type { AlgoliaProduct, digitalData } from '@/@types/types';
  import type { State } from '@/store/modules/product-list-page/state';
  import type { InGridBanners } from '@/@types/in-grid-banners';

  // Packages
  import 'normalize.css';
  import Vue from 'vue';
  import algoliasearch from 'algoliasearch/lite';
  // import { debounce } from 'lodash';

  // Middleware
  import listPageRouter from '@/router/listPageRouter';
  import LineItemListClass from '@/middleware/LineItemClasses/LineItemListClass';
  import { beautifyURLToRefinementURL } from '@/middleware/URLTransform';

  // Services
  import { getCornerFlags, CornerFlags } from '@/service/api-calls/cornerFlags';
  import { getListBanners, Banner } from '@/service/api-calls/banners';
  import { getDigitalData } from '@/service/api-calls/getDigitalData';
  import { isStatisticsEnabled } from '@/helpers/cookie-methods';

  // Helpers
  // @ts-ignore
  import { getPageInstanceID } from '@/assets/scripts/getDataLayerProperty/digital-data';
  import { isWebOnly } from '@/helpers/webOnly';

  // Stores
  import {
    readMobileRefinements,
    readDisplayMode,
    readSeoBanner,
    readMainBanner
  } from '@/store/modules/product-list-page/getters';
  import {
    commitMobileRefinements,
    commitSeoBanner,
    commitMainBanner
  } from '@/store/modules/product-list-page/mutations';

  // Atoms
  // Molecules
  import ListCard from '@/components/molecules/products/list-page/ListCard.vue';
  // mport { history as historyRouter } from 'instantsearch.js/es/lib/routers';
  // organisms
  import ProductFacets from '@/components/organisms/list-page/facets/ProductFacets.vue';
  import TopSection from '@/components/organisms/list-page/top-section/TopSection.vue';
  /* eslint-enable max-len, vue/max-len */
  import CloseCross from '@/components/atoms/btn/CloseCross.vue';
  import SeoBanner from '@/components/atoms/banners/SeoBanner.vue';
  import PromoBanner from '@/components/atoms/banners/PromoBanner.vue';
  import QuickView from
    '@/components/molecules/quick-view-modal/QuickViewModal.vue';
  import InGrid from '@/components/atoms/product-list/banners/IngridBanner.vue';
  import QuickLinks from '@/components/atoms/quick-links/QuickLinks.vue';

  export default Vue.extend({
    name: 'ListPage',

    components: {
      ProductFacets,
      TopSection,
      ListCard,
      CloseCross,
      SeoBanner,
      PromoBanner,
      QuickView,
      InGrid,
      QuickLinks
    },

    data () {
      return {
        searchClient: algoliasearch(
          window.Signet.VUE_APP_ALGOLIA_APP_ID as string,
          window.Signet.VUE_APP_ALGOLIA_APP_KEY as string
        ),
        routing: listPageRouter,
        // routing: {
        //   router: historyRouter(),
        //   stateMapping: {
        //     stateToRoute (uiState) {
        //       const indexUiState = uiState.dev_ERNEST_JONES_products || {};
        //       console.log('uiStates', uiState, this.indexName);
        //       return {
        //         query: indexUiState?.query
        //       };
        //     },
        //     routeToState (routeState) {
        //       console.log('routeState', routeState, routeState.q);
        //     }
        //   }
        // },
        middlewares: [
          () => {
            return {
              // onStateChange: debounce(() => {
              //   // Give it time for the URl to change
              //   // @ts-ignore
              //   this.updateBanners();
              // }, 400)
            };
          }
        ],
        cornerFlags: [] as CornerFlags[],
        quickLinks: undefined as Banner['quickLinks']
      };
    },

    computed: {
      /**
       * Index name for the product db
       */
      indexName () {
        return window.Signet.VUE_APP_ALGOLIA_SEARCH_INDEX_PRODUCTS;
      },

      /**
       * A list of attributes that the clear refinements buttons need to ignore
       */
      clearRefinementsIgnoreList () {
        return [
          'category.lvl0',
          'category.lvl1',
          'category.lvl2',
          'select'
        ];
      },

      /**
       * Get the boolean value if mobile refinements are open or not
       */
      mobileRefinementsAreOpen (): boolean {
        return readMobileRefinements(this.$store);
      },

      /**
       * Works out what view the products should be in, column, list or grid
       */
      displayMode (): 'grid'|'list'|'column' {
        return readDisplayMode(this.$store);
      },

      /**
       * Works out what classes to assign to the list page tag
       */
      listPageClasses (): { [key: string]: boolean } {
        return {
          'list-page--refinements-open': this.mobileRefinementsAreOpen
        };
      },

      /**
       * Works out what class to appear to the products
       */
      productClassObj (): string {
        return `products-display--${this.displayMode}`;
      },

      /**
       * Read data needed for the SEO banner
       */
      readSeoBanner (): State['seoBanner'] {
        return readSeoBanner(this.$store);
      },

      /**
       * Read data needed for the Promo/Hero/Main banner
       */
      readMainBanner (): State['mainBanner'] {
        return readMainBanner(this.$store);
      },

      /**
       * Set the text in the h1 tag
       */
      pageHeading (): string {
        // const query = listPageRouter.router.read().query[0];
        // this.readSeoBanner.title || query ||
        return 'Search';
      },

      /**
       * Works out if we are viewing in this in the store portal or not
       */
      isWeb (): boolean {
        return isWebOnly;
      },

      /**
       * Setting to return product that should or should not display.
       * On web show only products with display_on_website:true
       * On portal should all products with display_on_portal:true
       */
      facetFilters (): string {
        return this.isWeb ? 'display_on_website:true'
          : 'display_on_portal:true';
      }
    },

    mounted () {
      // Hack to get a polyfill working for IE as it looks like one of are
      // plugins don't support IE
      Object.isExtensible({});

      this.fetchCornerFlagRules();
      this.insertDigitalData();

      // Send the session ID for tracking
      if (isStatisticsEnabled()) {
        window.dataLayer?.push({
          algoliaUserToken: sessionStorage.getItem('session-id'),
          algoliaIndexName: this.indexName
        });
      }
    },

    methods: {

      /**
       * Update the mobile refinement switch value
       */
      closeRefinements () {
        commitMobileRefinements(this.$store);
      },

      /**
       * Transform the products using Algolia data into their Signet from
       */
      transformProducts (items: AlgoliaProduct[]) {
        return items.map((item) => {
          return new LineItemListClass(item);
        });
      },

      /**
       * Adds an entry to the data layer if the customer has given consent &
       * a facet was de-selected
       */
      resultsInteraction (isRefined: boolean) {
        // As we only what to fire of the event when a facet has been
        // de-selected make sure the prop `isRefined` is false
        if (!isRefined && isStatisticsEnabled()) {
          window.dataLayer?.push({
            event: 'filterClear',
            filterCategory: `Filter | ${getPageInstanceID()}`,
            filterAction: 'Results Interaction',
            filterValue: 'Clear button'
          });
        }
      },

      /**
       * Add an entry to the data layer when the clear refinements buttons
       * have been pressed.
       */
      filterInteraction () {
        if (isStatisticsEnabled()) {
          window.dataLayer?.push({
            event: 'filterClearAll',
            filterCategory: `Filter | ${getPageInstanceID()}`,
            filterAction: 'Filter Interaction',
            filterValue: 'Clear All Button'
          });
        }
      },

      /**
       * Go's to get a list of corner flag rules to apply to the products
       */
      fetchCornerFlagRules () {
        getCornerFlags()
          .then((rules) => {
            if (Array.isArray(rules)) {
              this.cornerFlags = rules;
            }
          })
          // eslint-disable-next-line no-console
          .catch((error) => console.error(error.message));
      },

      updateBanners () {
        getListBanners(location.pathname + location.search)
          .then((data) => {
            const { metaText, seoText, plpBanner, quickLinks } = data as Banner;
            const descriptionTag: HTMLMetaElement | null =
              document.querySelector('meta[name=description]');
            const h1Tag: HTMLHeadingElement | null =
              document.querySelector('h1');

            if (typeof metaText === 'object') {
              if (typeof metaText.title === 'string') {
                // Update page title
                document.title = metaText.title;
              }

              if (descriptionTag !== null &&
                typeof metaText.description === 'string') {
                // Update page description
                descriptionTag.content = metaText.description;
              }

              if (h1Tag !== null && typeof metaText.h1 === 'string') {
                // Update H1 tag
                h1Tag.textContent = metaText.h1;
              }
            }

            this.quickLinks = quickLinks;

            commitSeoBanner(this.$store, seoText);
            commitMainBanner(this.$store, plpBanner);
          })
          // eslint-disable-next-line no-console
          .catch((error) => console.error(error.message));
      },

      insertDigitalData () {
        getDigitalData(beautifyURLToRefinementURL(location))
          .then((data) => {
            window.digitalData = data as digitalData;

            if (isStatisticsEnabled()) {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({ digitalData: window.digitalData });
            }
          })
          // eslint-disable-next-line no-console
          .catch((error) => console.error(error.message));
      },

      /**
       * Gets the in grid banner if the index of the banner matches the index
       * of the loop
       */
      getInGridBanners (index: number): InGridBanners {
        const banners = window.Signet?.InGridBanner || [];
        const bannerAtIndex = banners.filter((banner) =>
          parseInt(banner.indexPosition, 10) === index);

        return bannerAtIndex[0];
      },

      /**
       * Checks if the current page has any in grid banners to show
       */
      showInGridBanners (index: number): boolean {
        const banners = window.Signet?.InGridBanner || [];
        const bannerAtIndex = banners.filter((banner) =>
          parseInt(banner.indexPosition, 10) === index);

        return bannerAtIndex.length > 0;
      }
    }
  });
</script>

<style lang="scss" src="./list-page.scss" />
