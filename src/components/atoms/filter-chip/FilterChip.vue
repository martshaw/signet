<template>
  <li class="refinement-item">
    <span class="refinement-item__label">
      {{ refinement.label }}
    </span>

    <button
      :aria-label="'Remove ' + refinement.label"
      class="refinement-item__btn"
      @click="refinement.refine(refinement); $emit('click')"
    >
      <!-- see https://codepoints.net/U+0078 -->
      &#x0078;
    </button>
  </li>
</template>

<script lang="ts">
  import type { AlgoliaRefinement } from '@/@types/types';
  import Vue, { PropType } from 'vue';

  export default Vue.extend({
    name: 'FilterChip',

    props: {
      refinement: {
        type: Object as PropType<AlgoliaRefinement>,
        required: true
      }
    }
  });
</script>
