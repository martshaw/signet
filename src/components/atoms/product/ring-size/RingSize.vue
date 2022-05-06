<template>
  <div
    class="product-ring-size"
    :class="className"
  >
    <div
      class="product-ring-size__text"
    >
      <h4 class="product-ring-size__heading">
        <label for="sku-change">
          Ring Size
        </label>
      </h4>
      <a
        v-if="displayFittingGuide"
        class="product-ring-size__will-it-fit"
        href="/webstore/ringsizer.cdo?icid=ej-pdp-ringsize"
      >
        Will it fit?
      </a>
    </div>
    <div
      id="sku-change"
      class="product-ring-size__data"
    >
      <select
        :id="'labelledby-' + id"
        :value="value"
        name="productNumber"
        class="product-ring-size__select"
        required
        @change="passValue"
      >
        <option
          :value="null"
          selected
          disabled
          hidden
        >
          Please Select
        </option>
        <option
          v-for="childSku in childrenSku"
          :key="childSku.sku"
          :disabled="childSku.stock && childSku.stock.outOfStock"
          :value="childSku.sku"
        >
          {{ childSku.label }}
          <template v-if="childSku.stock && childSku.stock.outOfStock">
            (Out of stock)
          </template>
          <template v-if="childSku.stock && childSku.stock.vendorStock">
            {{ childSku.stock.message }}
          </template>
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RingSize',

    props: {
      id: {
        type: String,
        required: true
      },
      childrenSku: {
        type: Array,
        required: true
      },
      className: {
        type: String,
        required: false
      },
      displayFittingGuide: {
        type: Boolean,
        required: false
      },
      value: {
        type: String,
        required: false
      }
    },

    methods: {
      passValue: function ($event) {
        this.$emit('input', $event.target.value);
      }
    }
  };
</script>

<style lang="scss" src="./ring-size.scss"/>
