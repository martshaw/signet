<template>
  <ais-stats :class-names="{'ais-Stats': 'hit-counter'}">
    <template v-slot="{nbHits}">
      <span>
        Showing <b class="hit-counter__numbers">
          {{ nbHits }} {{ renderHitCounter(nbHits) }}
        </b>
      </span>
    </template>
  </ais-stats>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'ProductsReturned',

    methods: {
      /**
       * Returns the correct plural or singular
       */
      renderHitCounter (hitsCount: number): 'Products' | 'Product' {
        return hitsCount > 1 ? 'Products' : 'Product';
      }
    }
  });
</script>
