<template>
  <div
    class="product-card"
    :data-insights-object-id="product.parentSku"
    :data-insights-position="position + 1"
    :data-insights-query-id="results.queryID"
  >
    <div class="product-card__image-container">
      <a :href="product.url">
        <product-image
          class="product-image"
          :product="product"
          default-size="200"
          sizes="(min-width: 720px) 210px, 145px"
        />
      </a>

      <product-badge :badge="cornerFlags" />
    </div>

    <product-similar
      :sku="product.productSku"
      :src-img="product.image.toString()"
    />

    <a
      :href="product.url"
      class="product-card__product-name"
    >
      <div class="product-name">
        <p
          v-if="isTudor"
          class="product-name__tudor"
        >
          Collect in Tudor specialist store
        </p>
        <p>{{ product.name }}</p>
      </div>
    </a>

    <product-usps
      v-if="product.usps"
      :usps="product.usps"
    />

    <product-ratings
      v-if="product.totalReviewers"
      :total-amount-of-reviewers="product.totalReviewers"
      :stars="product.ratings"
    />

    <a
      :href="product.url"
      class="product-card__product-price"
    >
      <div class="product-price">
        <price-history v-if="product.priceHistory">
          {{ product.priceHistory }}
        </price-history>

        <current-price
          :class="{'product-price__current--on-sale': product.isOnSale}"
        >
          {{ product.price }}
        </current-price>

        <price-installments v-if="product.installment">
          {{ product.installment }}
        </price-installments>
      </div>
    </a>

    <quick-view-button
      v-if="isQuickViewEnabled(results)"
      @click="toggleQuickView"
    >
      Quick View
    </quick-view-button>
  </div>
</template>

<script lang="ts">
  /* eslint-disable max-len, vue/max-len */
  // Types
  import type { AlgoliaUserData } from '@/@types/types';
  import type { CornerFlags } from '@/service/api-calls/cornerFlags';

  // Packages
  import Vue, { PropType } from 'vue';

  // Helpers
  import { isWebOnly } from '@/helpers/webOnly';
  import { isTudorProduct } from '@/helpers/isTudorProduct';

  // Middleware
  import LineItemListClass from '@/middleware/LineItemClasses/LineItemListClass';

  // Services
  // @ts-ignore
  import eventBus from '@/eventBus';

  // Stores

  // Atoms
  import ProductImage from '@/components/atoms/product/AdaptiveProductImage.vue';
  import ProductBadge from '@/components/atoms/product/ProductBadge.vue';
  import ProductRatings from '@/components/atoms/product/product-rating/ProductRatings.vue';
  import ProductUsps from '@/components/atoms/product/ProductUsps.vue';
  import CurrentPrice from '@/components/atoms/product/CurrentPrice.vue';

  // Molecules

  // Organisms
  /* eslint-enable max-len, vue/max-len */

  export default Vue.extend({
    name: 'ListCard',

    components: {
      ProductImage,
      ProductBadge,
      ProductUsps,
      ProductRatings,
      CurrentPrice,
      ProductSimilar: () => import(
        /* webpackChunkName: "product-similar" */
        '@/components/atoms/btn/ProductSimilar.vue'
        ),
      QuickViewButton: () =>
        import(
          /* webpackChunkName: "quick-view-button" */
          '@/components/atoms/btn/QuickViewButton.vue'
          ),
      PriceHistory: () => import(
        /* webpackChunkName: "price-history" */
        '@/components/atoms/product/PriceHistory.vue'
        ),
      PriceInstallments: () =>
        import(
          /* webpackChunkName: "price-installments" */
          '@/components/atoms/product/PriceInstallments.vue'
          )
    },

    props: {
      product: {
        type: LineItemListClass,
        required: true,
        validator: (product: any) => {
          return product instanceof LineItemListClass;
        }
      },

      position: {
        type: Number,
        required: true
      },

      results: {
        type: Object,
        required: true
      },

      cornerFlagsRules: {
        type: Array as PropType<CornerFlags[]>,
        required: true
      }
    },

    computed: {
      /**
       * Works out if this product is brand tudor
       */
      isTudor () {
        return isTudorProduct(this.product);
      },

      /**
       * Compute corner flag based on corner flag rules
       * Use product raw data from Algolia to find matching rule
       */
      cornerFlags () {
        // console.count('working it out');
        // Attributes requiring manual mapping to match endeca attribute names
        const cornerFlagAttrMap = {
          P_Merchandising_1: 'merchandising1',
          P_Merchandising_2: 'merchandising2',
          P_Merchandising_3: 'merchandising3',
          P_Merchandising_4: 'merchandising4',
          P_Merchandising_5: 'merchandising5',
          P_Merchandising_6: 'merchandising6',
          P_Merchandising_7: 'merchandising7',
          P_Available_Buy: 'availableToBuy',
          P_New: 'newCalc',
          P_On_Sale: 'isOnSale',
          P_Sku_ID: 'childSku',
          P_Orderable_on_Website: 'orderableOnWebsite'
        };

        /**
         * Get the property name for comparison
         * @arg inputPropertyName - Input property name
         * @returns Formatted property name
         */
        function getCompareProperty (inputPropertyName: string): string {
          if (inputPropertyName.startsWith('P_')) {
            const propertyValue: {[index: string]: string} = cornerFlagAttrMap;

            if (Object.keys(cornerFlagAttrMap).includes(inputPropertyName)) {
              return propertyValue[inputPropertyName];
            }

            return inputPropertyName
              .replace('P_', '')
              .replace('_', '')
              .toLowerCase();
          }
          return inputPropertyName.toLowerCase();
        }

        /**
         * Get the property value for comparison
         * @arg compareProperty - Compare property name
         * @arg compareValue - Comparison value
         * @returns - Formatted property value
         */
        function getCompareValue (
          compareProperty: string, compareValue: string) {
          if (compareProperty === 'P_New') {
            return (compareValue.toLowerCase() === 'new').toString();
          } else if (compareProperty === 'P_On_Sale') {
            return (compareValue.toLowerCase() === 'sale').toString();
          } else if (compareProperty.toLowerCase() ===
            'p_orderable_on_website') {
            return compareValue.toLowerCase() === 'yes' ? 'true' : 'false';
          }
          return compareValue.toLowerCase();
        }

        /**
         * Format value for comparison
         * @arg inputValue - Input value
         * @returns Formatted property value
         */
        function formatValue (inputValue: string | boolean | undefined) {
          if (typeof inputValue === 'string') {
            return inputValue.toLowerCase();
          }
          if (typeof inputValue === 'boolean') {
            return inputValue.toString();
          }
          return inputValue;
        }

        const cornerFlagMap = new Map();

        // Don't know why, but we have to convert this Array into an array like
        // object to stop an infinite loop form happening
        const rules = Array.from(this.cornerFlagsRules);

        const matchingRule = rules
          .sort((prev, next) => prev.priority > next.priority ? 1 : -1)
          .find(({ cornerFlagRules }) => {
            return cornerFlagRules.every(rule => {
              const comparisonsResult = formatValue(
                this.product[getCompareProperty(
                  rule.compareProperty)]) ===
                getCompareValue(rule.compareProperty, rule.compareValue);
              return (rule.comparisonType === 'EQUALS') ? comparisonsResult
                : !comparisonsResult;
            });
          });

        if (matchingRule) {
          cornerFlagMap.set('value', matchingRule.value);
          cornerFlagMap.set('borderColour', matchingRule.borderColour);
          cornerFlagMap.set('fontWeight', matchingRule.fontWeight);
          cornerFlagMap.set('color', matchingRule.plpColour);
          cornerFlagMap.set('backgroundColor', matchingRule.background);
        }

        return cornerFlagMap;
      }
    },

    methods: {

      /**
       * Checks if the algolia userData has quick_view_enabled
       * @arg item.results from algolia
       * @returns based on userData.quick_view_enabled property's value or
       * if any of the object in the chain is missing
       */
      isQuickViewEnabled (
        { userData }: {userData: AlgoliaUserData[]}): boolean {
        const quickViewEnabled = userData[0]?.quick_view_enabled;
        return isWebOnly && quickViewEnabled;
      },

      toggleQuickView () {
        eventBus.$emit('QuickViewModalOpen', this.product);
      }
    }
  });
</script>

<style lang="scss" src="./list-card.scss" />
