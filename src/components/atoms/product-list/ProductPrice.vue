<template>
  <div
    class="product-price"
    :class="className"
  >
    <del
      v-if="wasPrice"
      class="product-price__was"
    >
      {{ wasPrice }}
    </del>

    <span
      :class="getCurrentPriceClassName"
    >
      {{ currentPrice }}
    </span>

    <span
      v-if="installmentPrice"
      class="product-price__finance"
      :class="{[className + '__finance']: className}"
    >
      From
      <b
        class="product-price__finance--important"
        :class="{[className + '__finance--important']: className}"
      >
        {{ installmentPrice }}
      </b>
      p/m
    </span>
  </div>
</template>

<script>
  export default {
    name: 'ProductPrice',
    props: {
      wasPrice: {
        type: String,
        required: false
      },

      installmentPrice: {
        type: String,
        required: false
      },

      currentPrice: {
        type: String,
        required: true
      },
      /**
       * Whether the product is currently
       * on sale.
       */
      onSale: {
        type: Boolean,
        required: false
      },

      className: {
        type: String,
        required: false
      }
    },

    computed: {
      /**
       * This method returns the class name based on onSale variable's
       * binding
       * @returns {String} ie. the classname which needs to be applied to the
       * directive.
       */
      getCurrentPriceClassName () {
        let className = 'product-price__current';
        if (this.className) {
          className += ` ${this.className}__current`;
        }
        if (this.onSale) {
          className += ' product-price__current--on-sale';
        }
        return className;
      }
    }
  };
</script>

<style
  lang="scss"
  src="./product-price.scss"
/>
