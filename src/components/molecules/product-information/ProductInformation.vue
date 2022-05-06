<template>
  <div
    class="c-product-information"
    :class="className"
  >
    <product-name
      :name="productInfo.name"
      :show-collect-in-tudor="false"
      :class-name="'c-product-information__title'"
    ></product-name>

    <div
      :class="['price-ratings-container',
               'c-product-information__divider']"
    >
      <a
        :href="productInfo.url"
        class="c-product-information__financial-link"
      >
        <product-price
          :was-price="productInfo.priceHistory"
          :current-price="productInfo.price"
          :installment-price="productInfo.installment"
          :class-name="
            'price-ratings-container__price'"
        ></product-price>
      </a>
      <ratings-with-link
        :total-amount-of-reviewers="productInfo.totalReviewers"
        :stars="productInfo.ratings"
        :product-url="productInfo.url"
        :class-name="
          'price-ratings-container__ratings'"
      ></ratings-with-link>
    </div>
    <long-description
      :description="productInfo.longDescription"
      :url="productInfo.url + '#js-product-accordion'"
      :class-name="['c-product-information__description'
                    ,'c-product-information__divider']"
    ></long-description>

    <template
      v-if="productInfo.stepUpDown.length && productInfo.availableToBuyWeb"
    >
      <step-up-down
        :step-up-down="productInfo.stepUpDown"
        :pdp-url-part="productInfo.pdpUrlPart"
        :class-name="'c-product-information__stepupdown'"
      ></step-up-down>
    </template>

    <template
      v-if="productInfo.childrenSku.length && productInfo.availableToBuyWeb"
    >
      <ring-size
        :id="'ring-size'"
        :children-sku="productInfo.childrenSku"
        :value="value"
        @input="passValue"
      ></ring-size>
    </template>
  </div>
</template>

<script>
  import ProductName from '@/components/atoms/product-list/ProductName';
  import ProductPrice from '@/components/atoms/product-list/ProductPrice';
  import RatingsWithLink from
    '@/components/atoms/product/ratings-with-link/RatingsWithLink';
  import LongDescription from
    '@/components/atoms/product/long-description/LongDescription';

  export default {
    name: 'ProductInformation',

    components: {
      ProductName,
      ProductPrice,
      RatingsWithLink,
      LongDescription,
      StepUpDown: () =>
          import('@/components/atoms/product/step-up-down/StepUpDown'),
      RingSize: () =>
          import('@/components/atoms/product/ring-size/RingSize')
    },

    props: {
      productInfo: {
        type: Object,
        required: true
      },

      className: {
        type: Array,
        required: true
      },

      value: {
        type: String,
        required: false
      }
    },

    methods: {
      passValue: function (value) {
        this.$emit('input', value);
      }
    }
  };
</script>

<style lang="scss" src="./product-information.scss"/>
