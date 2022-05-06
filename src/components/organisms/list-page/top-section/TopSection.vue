<template>
  <section class="top-section">
    <filter-switch
      v-if="!productRefinementsShowing"
      class="top-section__filter-switch"
      @click="handleRefinementsEvent"
    />

    <apply-filter
      v-if="productRefinementsShowing"
      class="top-section__apply-btn"
      @click="handleRefinementsEvent"
    />

    <div
      v-if="!productRefinementsShowing"
      class="top-section__view-switcher"
    >
      <sort-by @change="sortByAnalytics" />

      <display-switch />
    </div>

    <products-returned v-if="!productRefinementsShowing" />

    <ais-current-refinements
      v-show="!productRefinementsShowing"
      :class-names="{
        'ais-CurrentRefinements': 'current-refinement',
        'ais-CurrentRefinements--noRefinement':
          'current-refinement--no-refinements'
      }"
      :excluded-attributes="excludedAttributes"
    >
      <template v-slot="{items}">
        <ais-range-input attribute="current_price">
          <template v-slot="{refine:priceRefine}">
            <ul class="current-refinement__list">
              <li class="current-refinement__title">
                <strong>Applied Filters</strong>
              </li>
              <template
                v-for="item in transformCurrentRefinements(items,priceRefine)"
              >
                <template v-for="refinement in item.refinements">
                  <filter-chip
                    :key="refinement.label"
                    :refinement="refinement"
                    @click="removeRefinementAnalytics"
                  />
                </template>
              </template>
            </ul>
          </template>
        </ais-range-input>
      </template>
    </ais-current-refinements>

    <ais-clear-refinements
      v-if="!productRefinementsShowing"
      :class-names="{
        'ais-ClearRefinements': 'clear-refinements',
        'ais-ClearRefinements-button': 'clear-refinements__btn',
        'ais-ClearRefinements-button--disabled':
          'clear-refinements__btn--disable'
      }"
      :excluded-attributes="excludedAttributes"
      @click="$emit('analyticsFilterInteraction')"
    >
      <template v-slot:resetLabel>
        Clear all filters
      </template>
    </ais-clear-refinements>
  </section>
</template>

<script lang="ts">
  /* eslint-disable max-len, vue/max-len */
  // Types
  import type { AlgoliaCurrentRefinement } from '@/@types/types';
  import Vue from 'vue';
  // @ts-ignore
  import { getPageInstanceID } from '@/assets/scripts/getDataLayerProperty/digital-data';
  import { isStatisticsEnabled } from '@/helpers/cookie-methods';

  // Stores
  import {
    readHighest,
    readLowestPrice,
    readMobileRefinements
  } from '@/store/modules/product-list-page/getters';
  import { commitMobileRefinements } from '@/store/modules/product-list-page/mutations';

  // Atoms
  import FilterSwitch from '@/components/atoms/btn/FilterSwitch.vue';
  import ApplyFilter from '@/components/atoms/btn/ApplyFilter.vue';
  import SortBy from '@/components/atoms/form-controls/SortBy.vue';
  import ProductsReturned
    from '@/components/atoms/counters/ProductsReturned.vue';
  import FilterChip from '@/components/atoms/filter-chip/FilterChip.vue';

  // Molecules
  import DisplaySwitch
    from '@/components/molecules/product-list/display-switch/DisplaySwitch.vue';
  /* eslint-enable max-len, vue/max-len */

  export default Vue.extend({
    name: 'TopSection',

    components: {
      FilterSwitch,
      ApplyFilter,
      SortBy,
      ProductsReturned,
      FilterChip,
      DisplaySwitch
    },

    props: {
      excludedAttributes: {
        type: Array,
        default: () => []
      }
    },

    computed: {
      productRefinementsShowing () {
        return readMobileRefinements(this.$store);
      }
    },

    methods: {
      /**
       * Formats the array of items we get with the current refinements
       * components from Algolia. Algolia combines the same type into one
       * refinement.
       */
      transformCurrentRefinements (
        items: AlgoliaCurrentRefinement[],
        refine: AlgoliaCurrentRefinement['refine']
      ): AlgoliaCurrentRefinement[] {
        const newItems: AlgoliaCurrentRefinement[] = [];
        const map = new Map();
        const currencyFormatter = new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP',
          maximumSignificantDigits: 5
        });

        map.set('instock_website', 'Hide out of stock items');
        map.set('on_sale_calc', 'Items on Sale');

        items.forEach((item) => {
          newItems.push({
            ...item,
            refinements: item.refinements.map((refinement) => {
              return {
                ...refinement,
                refine: item.refine
              };
            })
          });
        });

        /**
         * Check is we have a min and a max so we can remove the first
         * one from the array
         */
        newItems.forEach((item) => {
          if (item.attribute === 'current_price') {
            if (item.refinements.length === 2) {
              item.refinements.splice(0, 1);
            }
          }
        });

        newItems.forEach((item) => {
          item.refinements.forEach((refinement) => {
            if (map.has(refinement.attribute)) {
              refinement.label = map.get(refinement.attribute);
            }

            if (item.attribute === 'current_price') {
              const lowestPrice = readLowestPrice(this.$store);
              const highestPrice = readHighest(this.$store);

              refinement.label = `${currencyFormatter.format(lowestPrice)} - ${
                currencyFormatter.format(highestPrice)}`;
              refinement.refine = refine;
            }
          });
        });

        return newItems;
      },

      /**
       * Add an entry into the data layer when the sort by has changed
       */
      sortByAnalytics (selectedOption: { label: string, value: string }): void {
        window.dataLayer = window.dataLayer || [];

        if (isStatisticsEnabled()) {
          window.dataLayer.push({
            event: 'filterRelevance',
            filterCategory: `Filter | ${getPageInstanceID()}`,
            filterAction: 'Relevance',
            filterValue: selectedOption.label
          });
        }
      },

      /**
       * When a customer clicks to remove an applied filter,
       * push the 'filterClear' event to the dataLayer for GTM
       * to process.
       */
      removeRefinementAnalytics () {
        window.dataLayer = window.dataLayer || [];

        if (isStatisticsEnabled()) {
          window.dataLayer.push({
            event: 'filterClear',
            filterCategory: `Filter | ${getPageInstanceID()}`,
            filterAction: 'Results Interaction',
            filterValue: 'Clear button'
          });
        }
      },

      /**
       * Event for handling when the mobile refinements are open
       */
      handleRefinementsEvent () {
        commitMobileRefinements(this.$store);
      }
    }
  });
</script>

<style lang="scss" src="./top-section.scss" />
