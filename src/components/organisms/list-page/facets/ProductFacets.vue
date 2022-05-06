<template>
  <div class="refinements">
    <ais-clear-refinements
      :excluded-attributes="excludedAttributes"
      :class-names="{
        'ais-ClearRefinements': 'remove-refinements',
        'ais-ClearRefinements-button': 'remove-refinements__btn',
        'ais-ClearRefinements-button--disabled':
          'remove-refinements--no-refinements'
      }"
      @click="$emit('analyticsFilterInteraction')"
    >
      <template v-slot:resetLabel>
        Clear all filters
      </template>
    </ais-clear-refinements>

    <!-- web only stock filter -->
    <ais-toggle v-if="isWeb" />

    <ais-dynamic-widgets
      :facets="['*']"
      :max-values-per-facet.camel="100"
      class="facet-section"
      :transform-items="storingItems"
    >
      <refinement-accordion
        title="Price"
        class-names="facet-category"
        :open="expandedCategory['current_price']"
      >
        <ais-range-input attribute="current_price">
          <template v-slot="{currentRefinement, range, refine}">
            <vue-slider
              :min="range.min"
              :max="range.max"
              :lazy="true"
              :silent="true"
              :value="toValue(currentRefinement, range)"
              :height="17"
              :width="210"
              :dot-size.camel="18"
              :contained="true"
              @change="refine({min: $event[0], max: $event[1]})"
            />
          </template>
        </ais-range-input>
        <ais-range-input
          attribute="current_price"
          :class-names="{
            'ais-RangeInput': 'price-range',
            'ais-RangeInput-separator': 'price-range__separator',
            'ais-RangeInput-submit': 'price-range__button',
            'ais-RangeInput-input--min': 'price-range__input',
            'ais-RangeInput-input--max': 'price-range__input'
          }"
        >
          <template v-slot="{currentRefinement, range, refine}">
            <div class="price-range__manual-input">
              <span>&pound;</span>
              <input
                type="number"
                class="price-range__input"
                :min="range.min"
                :max="range.max"
                :placeholder="range.min"
                :value="getCorrectLowestPrice(currentRefinement.min, range.min)"
                @blur="refine({
                  min: $event.currentTarget.value,
                  max: getCorrectHighPrice(currentRefinement.max,range.max)
                })"
              />
            </div>

            <div class="price-range__manual-input">
              <span>&pound;</span>
              <input
                type="number"
                class="price-range__input"
                :min="range.min"
                :max="range.max"
                :placeholder="range.max"
                :value="getCorrectHighPrice(currentRefinement.max,range.max)"
                @blur="refine({
                  min: getCorrectLowestPrice(currentRefinement.min, range.min),
                  max: $event.currentTarget.value
                })"
              />
            </div>
          </template>
        </ais-range-input>

        <ais-toggle-refinement
          label="Items on Sale"
          attribute="on_sale_calc"
        >
          <template v-slot="{value, refine}">
            <generic-checkbox
              id="on_sale_calc"
              name="on_sale_calc"
              value="false"
              class="on-sale"
              :checked="value.isRefined"
              @change="refine(value)"
            >
              <template #after>
                <span class="on-sale__label">Items on sale</span>
              </template>
            </generic-checkbox>
          </template>
        </ais-toggle-refinement>
      </refinement-accordion>

      <refinement-accordion
        title="Category"
        class-names="facet-category"
        :open="expandedCategory['category.lvl0']"
      >
        <ais-menu
          attribute="category.lvl0"
          :class-names="{
            'ais-Menu-list': 'facet-menu',
            'ais-Menu-item': 'facet-menu__item',
            'ais-Menu-link': 'facet-menu__link',
            'ais-Menu-count': 'facet-menu__count'
          }"
        />
      </refinement-accordion>

      <refinement-accordion
        title="Ratings"
        class-names="facet-category"
        :open="expandedCategory['avg_overall_rating']"
      >
        <ais-rating-menu
          attribute="avg_overall_rating"
          :class-names="{
            'ais-RatingMenu-list': 'ratings',
            'ais-RatingMenu-item': 'ratings__item',
            'ais-RatingMenu-link': 'ratings__link',
            'ais-RatingMenu-label': 'ratings__label',
            'ais-RatingMenu-count': 'ratings__count',
            'ais-RatingMenu-starIcon': 'ratings__stars',
            'ais-RatingMenu-starIcon--full': 'ratings__stars--full',
            'ais-RatingMenu-starIcon--empty': 'ratings__stars--empty'
          }"
        />
      </refinement-accordion>

      <refinement-accordion
        title="Brand"
        class-names="facet-category"
        :open="expandedCategory['brand.lvl0']"
      >
        <ais-refinement-list
          attribute="brand.lvl0"
          :sort-by="sortBy"
          operator="or"
          :class-names="{
            'ais-RefinementList-list': 'facet-menu',
            'ais-RefinementList-item': 'facet-menu__item'
          }"
        >
          <template v-slot="{items, refine, searchForItems}">
            <div class="facet-menu__search">
              <label
                for="brand"
                class="u-visually-hidden"
              >
                Search for brands
              </label>
              <input
                id="brand"
                class="facet-menu__search-input"
                placeholder="Search other available brands"
                @input="searchForItems($event.currentTarget.value)"
              />
            </div>

            <ul class="facet-menu">
              <li
                v-for="item in items"
                :key="item.value"
                class="facet-menu__item"
              >
                <generic-checkbox
                  :id="item.value"
                  :value="item.value"
                  class="facet-menu__label"
                  :checked="item.isRefined"
                  @change="refine(item.value);"
                >
                  <template #after>
                    {{ item.value }}
                    <span class="facet-menu__count">{{ item.count }}</span>
                  </template>
                </generic-checkbox>
              </li>
            </ul>
          </template>
        </ais-refinement-list>
      </refinement-accordion>

      <refinement-list
        label="Recipient"
        attribute="recipient"
        :expanded="expandedCategory.recipient"
      />

      <refinement-list
        label="Sub Category"
        attribute="category.lvl1"
        :expanded="expandedCategory['category.lvl1']"
      />

      <refinement-list
        label="Brands"
        attribute="brand.lvl0"
        :expanded="expandedCategory['brand.lvl0']"
      />

      <refinement-list
        label="Occasion"
        attribute="occasion"
        :expanded="expandedCategory.occasion"
      />

      <refinement-list
        label="Metal Type"
        attribute="material.lvl0"
        :expanded="expandedCategory['material.lvl0']"
      />

      <refinement-list
        label="Stone"
        attribute="stone_type.lvl0"
        :expanded="expandedCategory['stone_type.lvl0']"
      />

      <refinement-list
        label="Stone Type"
        attribute="stone_type.lvl1"
        :expanded="expandedCategory['stone_type.lvl1']"
      />

      <refinement-list
        label="Metal Carat"
        attribute="material.lvl1"
        :expanded="expandedCategory['material.lvl1']"
      />

      <refinement-list
        label="Stone Colour"
        attribute="stone_colour"
        :expanded="expandedCategory.stone_colour"
      />

      <refinement-list
        label="Carat Weight"
        attribute="carat_weight_range"
        :expanded="expandedCategory.carat_weight_range"
      />

      <refinement-list
        label="Birthstone"
        attribute="birthstone"
        :expanded="expandedCategory.birthstone"
      />

      <refinement-list
        label="Style"
        attribute="style"
        :expanded="expandedCategory.style"
      />

      <refinement-list
        label="Chain Type"
        attribute="chain_type"
        :expanded="expandedCategory.chain_type"
      />

      <refinement-list
        label="Collection"
        attribute="collection"
        :expanded="expandedCategory.collection"
      />

      <refinement-list
        label="Length"
        attribute="length_range"
        :expanded="expandedCategory.length_range"
      />

      <refinement-list
        label="Strap Material"
        attribute="strap_material"
        :expanded="expandedCategory.strap_material"
      />

      <refinement-list
        label="Strap Style"
        attribute="strap_style"
        :expanded="expandedCategory.strap_style"
      />

      <refinement-list
        label="Case material"
        attribute="case_material"
        :expanded="expandedCategory.case_material"
      />

      <refinement-list
        label="Watch Face Shape"
        attribute="face_shape"
        :expanded="expandedCategory.face_shape"
      />

      <refinement-list
        label="Watch Features"
        attribute="watch_features"
        :expanded="expandedCategory.watch_features"
      />

      <refinement-list
        label="Movement"
        attribute="movement"
        :expanded="expandedCategory.movement"
      />

      <refinement-list
        label="Water Resistant"
        attribute="water_resistant"
        :expanded="expandedCategory.water_resistant"
      />

      <refinement-list
        label="Brand Series"
        attribute="brand_series"
        :expanded="expandedCategory.brand_series"
      />

      <refinement-list
        label="Sizes"
        attribute="size"
        :expanded="expandedCategory.size"
      />

      <ais-refinement-list
        attribute="select"
        hidden
      />
    </ais-dynamic-widgets>
  </div>
</template>

<script lang="ts">
  /* eslint-disable max-len, vue/max-len */
  // Types

  // Packages
  import Vue from 'vue';
  import VueSlider from 'vue-slider-component';

  // Middleware

  // Services

  // Stores
  import {
    commitLowestPrice,
    commitHighestPrice
  } from '@/store/modules/product-list-page/mutations';

  // Helpers
  import { isWebOnly } from '@/helpers/webOnly';

  // Atoms
  import AisToggle from '@/components/atoms/btn/AisToggle.vue';
  import RefinementAccordion from '@/components/atoms/accordion/RefinementAccordion.vue';
  import GenericCheckbox from '@/components/atoms/form-controls/generic-checkbox/GenericCheckbox.vue';

  // Molecules
  import RefinementList from '@/components/molecules/product-list/refinement-list/RefinementList.vue';

  // Organisms
  /* eslint-enable max-len, vue/max-len */

  export default Vue.extend({
    name: 'ProductFacets',

    components: {
      AisToggle,
      RefinementAccordion,
      GenericCheckbox,
      VueSlider,
      RefinementList
    },

    props: {
      excludedAttributes: {
        type: Array,
        default: () => []
      }
    },

    data () {
      return {
        expandedCategory: {} as {[key: string]: boolean},
        sortBy: [
          'isRefined',
          'name:asc'
        ]
      };
    },

    computed: {

      /**
       * Uses the help "isWebOnly" to would out if this page is being viewed
       * on the store portal or website
       */
      isWeb () {
        return isWebOnly;
      }
    },

    methods: {
      /**
       * Set the default value for the two thumbs on the price slider
       */
      toValue (
        value: {min: number | undefined, max: number | undefined},
        range: {min: number, max: number}
      ) {
        const lowest = this.getCorrectLowestPrice(value.min, range.min);
        const highest = this.getCorrectHighPrice(value.max, range.max);

        commitLowestPrice(this.$store, lowest);
        commitHighestPrice(this.$store, highest);
        return [
          lowest,
          highest
        ];
      },

      swatch (facetName: string) {
        const name = facetName.replace(' ', '-').toLowerCase();
        return `//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/swatches-${
          name}.svg`;
      },

      /**
       * Using the list we get form Algolia to set a new property to
       * indicate if the category/menu/section should be open be default
       */
      storingItems (items: string[]) {
        const amountToGet = window.matchMedia('(max-width: 720px)').matches
          ? 1 : 4;

        items.slice(0, amountToGet).forEach((facet) => {
          this.$set(this.expandedCategory, facet, true);
        });

        return items;
      },

      loadingError (event: ErrorEvent) {
        (event.target as HTMLImageElement).src =
          'https://d2r6ga9xnxj9b6.cloudfront.net/icons/' +
          'swatches/blank-swatch.svg';
      },

      getCorrectHighPrice (current: number | undefined, range: number) {
        if (range === 0) {
          return current;
        } else {
          return (current || 0) > range ? range : current || range;
        }
      },

      getCorrectLowestPrice (current: number | undefined, range: number) {
        return (current || 0) < range ? range : current || range;
      }
    }
  });
</script>

<style lang="scss" src="./product-facets.scss" />
