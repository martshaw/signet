<template>
  <ais-toggle-refinement
    label="Show out of stock items"
    attribute="instock_website"
    :on="true"
    class="stock-toggle"
  >
    <template v-slot="{value, refine}">
      <label class="stock-toggle__label">
        Show out of stock items

        <span
          role="presentation"
          class="stock-toggle__switch"
          :style="!value.isRefined ? {background: '#7c6992'} : null"
        >
          <input
            type="checkbox"
            :checked="!value.isRefined"
            :value="value.isRefined"
            :name="value.name"
            class=" stock-toggle__input"
            @change.prevent="refine(value)"
          />

          <span class="stock-toggle__thumb" />
          <span class="stock-toggle__switch--on">on</span>
          <span class="stock-toggle__switch--off">off</span>
        </span>
      </label>
    </template>
  </ais-toggle-refinement>
</template>

<script lang="ts">
  /* eslint-disable max-len, vue/max-len */
  // Types

  // Packages
  import Vue from 'vue';

  // Middleware

  // Services

  // Stores

  // Atoms

  // Molecules

  // Organisms
  /* eslint-enable max-len, vue/max-len */

  export default Vue.extend({
    name: 'AisToggle'
  });
</script>
