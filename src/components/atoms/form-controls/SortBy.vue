<template>
  <ais-sort-by
    :items="sortIndexes"
    :class-names="{'ais-SortBy': 'sort-by'}"
  >
    <template v-slot="{currentRefinement, refine}">
      <v-select
        :options="sortIndexes"
        :clearable="false"
        :searchable="false"
        :value="currentRefinement"
        :reduce="items => items.value"
        @input="refine"
        @option:selected="$emit('change')"
      />
    </template>
  </ais-sort-by>
</template>

<script lang="ts">
  import Vue from 'vue';
  import vSelect from 'vue-select';

  export default Vue.extend({
    name: 'SortBy',

    components: {
      vSelect
    },

    computed: {
      /**
       * Checks if we have a valid value for the config
       * "VUE_APP_ALGOLIA_SEARCH_INDEX_PRODUCTS"
       */
      getRelevanceIndex (): string {
        const indexName = window.Signet.VUE_APP_ALGOLIA_SEARCH_INDEX_PRODUCTS;

        if (typeof indexName !== 'string') {
          // eslint-disable-next-line no-console
          console.error('The index name for "dev_HSAMUEL_products" is ' +
            'missing or not a string, so "sort by" won\'t work');
        }

        return indexName || '';
      },

      /**
       * Checks if we have a valid value for the config
       * "VUE_APP_ALGOLIA_TOP_RATED_INDEX_PRODUCTS"
       */
      getTopRated (): string {
        const indexName = window.Signet
          .VUE_APP_ALGOLIA_TOP_RATED_INDEX_PRODUCTS;

        if (typeof indexName !== 'string') {
          // eslint-disable-next-line no-console
          console.error('The index name for "dev_HSAMUEL_products_Top_Rated" ' +
            'is missing or not a string, so "sort by" won\'t work');
        }

        return indexName || '';
      },

      /**
       * Checks if we have a valid value for the config
       * "VUE_APP_ALGOLIA_PRICE_DESC_INDEX_PRODUCTS"
       */
      getHighestPrice (): string {
        const indexName = window.Signet
          .VUE_APP_ALGOLIA_PRICE_DESC_INDEX_PRODUCTS;

        if (typeof indexName !== 'string') {
          // eslint-disable-next-line no-console
          console.error('The index name for "dev_HSAMUEL_products_Price_Asc" ' +
            'is missing or not a string, so "sort by" won\'t work');
        }

        return indexName || '';
      },

      /**
       * Checks if we have a valid value for the config
       * "VUE_APP_ALGOLIA_PRICE_DESC_INDEX_PRODUCTS"
       */
      getLowestPrice (): string {
        const indexName = window.Signet
          .VUE_APP_ALGOLIA_PRICE_ASC_INDEX_PRODUCTS;

        if (typeof indexName !== 'string') {
          // eslint-disable-next-line no-console
          console.error('The index name for "dev_HSAMUEL_products_Price_Desc"' +
            ' is missing or not a string, so "sort by" won\'t work');
        }

        return indexName || '';
      },

      /**
       * Checks if we have a valid value for the config
       * "VUE_APP_ALGOLIA_NEW_ARRIVAL_INDEX_PRODUCTS"
       */
      getNewestArrivals (): string {
        const indexName = window.Signet
          .VUE_APP_ALGOLIA_NEW_ARRIVAL_INDEX_PRODUCTS;

        if (typeof indexName !== 'string') {
          // eslint-disable-next-line no-console
          console.error('The index name for ' +
            '"dev_HSAMUEL_products_New_Arrivals" is missing or not a ' +
            'string, so "sort by" won\'t work');
        }

        return indexName || '';
      },

      /**
       * A list of index's to be used by the sort by component
       */
      sortIndexes (): {value: string, label: string}[] {
        return [
          {
            value: this.getRelevanceIndex,
            label: 'Relevance'
          },
          {
            value: this.getTopRated,
            label: 'Top Rated'
          },
          {
            value: this.getHighestPrice,
            label: 'Highest Price'
          },
          {
            value: this.getLowestPrice,
            label: 'Lowest Price'
          },
          {
            value: this.getNewestArrivals,
            label: 'Newest Arrivals'
          }
        ];
      }
    }
  });
</script>
