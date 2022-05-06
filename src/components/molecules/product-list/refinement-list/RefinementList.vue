<template>
  <ais-panel :key="attribute">
    <refinement-accordion
      :title="label"
      class-names="facet-category"
      :open="expanded"
    >
      <ais-refinement-list
        :attribute="attribute"
        :class-names="{
          'ais-RefinementList-list': 'facet-menu',
          'ais-RefinementList-item': 'facet-menu__item'
        }"
      >
        <template v-slot:item="{item, refine}">
          <generic-checkbox
            :id="item.value"
            :value="item.value"
            :checked="item.isRefined"
            class="facet-menu__label"
            @change="refine(item.value);
                     $emit('analyticsResultsInteraction',
                           item.isRefined);"
          >
            <template #after>
              <img
                :src="swatch(item.value)"
                alt=""
                width="18"
                height="18"
                loading="lazy"
                @error="loadingError"
              />
              <span class="facet-menu__value">
                {{ item.value }}
                <span class="facet-menu__count">{{ item.count }}</span>
              </span>
            </template>
          </generic-checkbox>
        </template>
      </ais-refinement-list>
    </refinement-accordion>
  </ais-panel>
</template>

<script lang="ts">
/* eslint-disable max-len, vue/max-len */
// Types

// Packages
  import Vue from 'vue';

  // Middleware

  // Services

  // Helpers

  // Stores

  // Atoms
  import RefinementAccordion from '@/components/atoms/accordion/RefinementAccordion.vue';
  import GenericCheckbox from '@/components/atoms/form-controls/generic-checkbox/GenericCheckbox.vue';

  // Molecules

  // Organisms
  /* eslint-enable max-len, vue/max-len */

  export default Vue.extend({
    name: 'RefinementList',

    components: {
      RefinementAccordion,
      GenericCheckbox
    },

    props: {
      attribute: {
        type: String,
        required: true
      },

      label: {
        type: String,
        required: true
      },

      expanded: {
        type: Boolean
      }
    },

    methods: {
      swatch (facetName: string) {
        const name = facetName.replace(' ', '-').toLowerCase();
        return `//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/swatches-${
          name}.svg`;
      },

      loadingError (event: ErrorEvent) {
        (event.target as HTMLImageElement).src =
          'https://d2r6ga9xnxj9b6.cloudfront.net/icons/' +
          'swatches/blank-swatch.svg';
      }
    }
  });
</script>
