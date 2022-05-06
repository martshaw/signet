<template>
  <details
    ref="js-section-detail"
    :class="classNames"
    @toggle="toggleIcon"
  >
    <summary :class="`${classNames}__title`">
      <span>{{ title }}</span>

      <svg
        :class="`${classNames}__icon`"
        viewBox="0 0 17 1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="square"
        >
          <g
            transform="translate(-1331.000000, -448.000000)"
            stroke="#979797"
          >
            <line
              x1="1347.5"
              y1="448.5"
              x2="1331.5"
              y2="448.5"
            />
            <line
              v-if="expanded"
              x1="1339.5"
              y1="440.5"
              x2="1339.5"
              y2="456.5"
            />
          </g>
        </g>
      </svg>
    </summary>

    <div :class="`${classNames}__content`">
      <slot />
    </div>
  </details>
</template>

<script lang="ts">
  /* eslint-disable max-len, vue/max-len */
  // Types

  // Packages
  import Vue from 'vue';

  // Middleware

  // Services

  // Stores

  // Helpers

  // Atoms

  // Molecules

  // Organisms
  /* eslint-enable max-len, vue/max-len */

  export default Vue.extend({
    name: 'RefinementAccordion',

    props: {
      title: {
        type: String,
        required: true
      },

      classNames: {
        type: String,
        default: 'section'
      }
    },

    data () {
      return {
        expanded: !this.$attrs.open
      };
    },

    methods: {
      toggleIcon () {
        const detailElm = this.$refs['js-section-detail'] as HTMLDetailsElement;

        this.expanded = !detailElm.open;
      }
    }
  });
</script>
