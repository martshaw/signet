<template>
  <ais-instant-search
    :search-client="searchClient"
    :index-name="indexName"
    :routing="routing"
    :middlewares="middlewares"
  >
    <ais-configure
      :filters="facetFilters"
      :faceting-after-distinct.camel="true"
      :click-analytics.camel="true"
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
      :data-insights-index="indexName"
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
            href="#seo-banner"
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
        :excluded-attributes="clearRefinementsIgnoreList"
        @analyticsFilterInteraction="resultsInteraction"
      />

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
              @send-select-event="sendSelectItem(product, index)"
            />
          </template>

          <button
            v-show="!isLastPage"
            class="c-btn t-red-btn load-more-btn"
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
        id="seo-banner"
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
  import type { ListProductItem } from '@/@types/data-layer';

  // Packages
  import 'normalize.css';
  import Vue from 'vue';
  import algoliasearch from 'algoliasearch/lite';

  // Middleware
  import listPageRouter from '@/router/listPageRouter';
  import LineItemListClass from '@/middleware/LineItemClasses/LineItemListClass';
  import { beautifyURLToRefinementURL } from '@/middleware/URLTransform';

  // Services
  import { getCornerFlags, CornerFlags } from '@/service/api-calls/cornerFlags';
  import { getListBanners, Banner } from '@/service/api-calls/banners';
  import { getDigitalData } from '@/service/api-calls/getDigitalData';
  import { isStatisticsEnabled } from '@/helpers/cookie-methods';

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

  // Helpers
  // @ts-ignore
  import { getPageInstanceID } from '@/assets/scripts/getDataLayerProperty/digital-data';
  import { isWebOnly } from '@/helpers/webOnly';

  // Atoms

  // Molecules
  import ListCard from '@/components/molecules/products/list-page/ListCard.vue';

  // organisms
  import ProductFacets from '@/components/organisms/list-page/facets/ProductFacets.vue';
  import TopSection from '@/components/organisms/list-page/top-section/TopSection.vue';
  /* eslint-enable max-len, vue/max-len */
  import CloseCross from '@/components/atoms/btn/CloseCross.vue';
  import SeoBanner from '@/components/atoms/banners/SeoBanner.vue';
  import PromoBanner from '@/components/atoms/banners/PromoBanner.vue';
  import QuickView from
    '@/components/molecules/quick-view-modal/QuickViewModal.vue';
  import InGrid from
    '@/components/atoms/product-list/banners/IngridBanner.vue';
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
      function createSortedCache (options = { serializable: true }) {
        let cache: Record<
            string,
            typeof options['serializable'] extends true ? string : any
            > = {};
        // this part here is customized to sort the keys
        function serialize (key: object | string) {
          if (
            typeof key === 'object' &&
            // @ts-ignore
            key.request.path === '1/indexes/*/queries'
          ) {
            const object: any = key;
            return JSON.stringify({
              ...object,
              request: {
                ...object.request,
                data: {
                  ...object.request.data,
                  // @ts-ignore
                  requests: object.request.data.requests.map((request) => ({
                    ...request,
                    params: request.params.split('&').sort().join('&')
                  }))
                }
              }
            });
          }
          return JSON.stringify(key);
        }
        return {
          get<TValue> (
              key: object | string,
              defaultValue: () => Readonly<Promise<TValue>>,
              events: { miss: (value: TValue) => Promise<any> } = {
                miss: () => Promise.resolve()
              }
          ) {
            const keyAsString = serialize(key);
            if (keyAsString in cache) {
              return Promise.resolve(
                  options.serializable
                      ? JSON.parse(cache[keyAsString])
                      : cache[keyAsString]
              );
            }
            const promise = defaultValue();
            const miss = (events && events.miss) || (() => Promise.resolve());
            return promise.then((value) => miss(value)).then(() => promise);
          },
          set<TValue> (
              key: object | string,
              value: TValue
          ): Readonly<Promise<TValue>> {
            cache[serialize(key)] = options.serializable
                ? JSON.stringify(value)
                : value;
            return Promise.resolve(value);
          },
          delete (key: object | string) {
            delete cache[serialize(key)];
            return Promise.resolve();
          },
          clear () {
            cache = {};
            return Promise.resolve();
          }
        };
      }

      return {
        searchClient: algoliasearch(
            window.Signet.VUE_APP_ALGOLIA_APP_ID as string,
            window.Signet.VUE_APP_ALGOLIA_APP_KEY as string,
            {
              // @ts-ignore
              requestsCache: createSortedCache(),
              // @ts-ignore
              responsesCache: createSortedCache({ serializable: false })
            }
        ),
        routing: listPageRouter,
        middlewares: [
          () => {
            return {
              onStateChange: () => {
                // Give it time for the URl to change
                // @ts-ignore
                this.updateBanners();
              }
            };
          }
        ],
        cornerFlags: [] as CornerFlags[],
        quickLinks: undefined as Banner['quickLinks'],
        heading: undefined as string | undefined
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
          'select',
          'query'
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
        const url = new URLSearchParams(location.search);
        const query = url.get('query');

        return this.heading || query || 'Search';
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
      this.fetchCornerFlagRules();
      this.insertDigitalData();

      // Send the session ID for tracking
      if (isStatisticsEnabled()) {
        window.dataLayer?.push({
          algoliaUserToken: sessionStorage.getItem('session-id')
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
       * Transform the products using Algolia data into there Signet from
       */
      transformProducts (items: AlgoliaProduct[]) {
        if (isStatisticsEnabled()) {
          this.sendViewItemListEvent(items);
        }

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

      /**
       * Tracking event to fire for the products.
       */
      sendViewItemListEvent (products: AlgoliaProduct[]) {
        const items: ListProductItem[] = [];

        if (Array.isArray(window.dataLayer)) {
          products?.forEach((product, index) => {
            items.push({
              item_id: product.parent_sku.toString(),
              item_name: product.short_name,
              currency: 'GBP',
              index: index,
              item_brand: product.brand?.lvl0 || 'Unknown',
              item_category: product.category.lvl0,
              item_category2: product.category.lvl1 || undefined,
              item_category3: product.category.lvl2 || undefined,
              item_list_id: 'plp',
              item_list_name: this.pageHeading,
              price: product.current_price
            });
          });

          window.dataLayer.push({ ecommerce: null });
          window.dataLayer.push({
            event: 'view_item_list',
            ecommerce: { items }
          });
        }
      },

      /**
       * Tracking event to fire when a product has been clicked on
       */
      sendSelectItem (product: LineItemListClass, index: number) {
        if (isStatisticsEnabled() && Array.isArray(window.dataLayer)) {
          const item: ListProductItem = {
            item_id: product.productSku.toString(),
            item_name: product.name,
            currency: 'GBP',
            index: index,
            item_brand: product.brand?.lvl0 || 'Unknown',
            item_category: product.categories.lvl0,
            item_category2: product.categories.lvl1 || undefined,
            item_category3: product.categories.lvl2 || undefined,
            item_list_id: 'plp',
            item_list_name: this.pageHeading,
            price: product.priceAsNumber
          };

          window.dataLayer.push({ ecommerce: null });
          window.dataLayer.push({
            event: 'select_item',
            ecommerce: {
              items: [item]
            }
          });
        }
      },

      updateBanners () {
        getListBanners(location.pathname + location.search)
          .then((data) => {
            const { metaText, seoText, plpBanner, quickLinks } = data as Banner;
            const descriptionTag: HTMLMetaElement | null =
              document.querySelector('meta[name=description]');

            if (typeof metaText === 'object') {
              // Update page title
              if (typeof metaText.title === 'string') {
                document.title = metaText.title;
              }

              if (descriptionTag !== null &&
                typeof metaText.description === 'string') {
                // Update page description
                descriptionTag.content = metaText.description;
              }
            }

            this.heading = metaText?.h1;
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

            if (isStatisticsEnabled() && Array.isArray(window.dataLayer)) {
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
