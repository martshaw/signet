<template>
  <div class="display-switch">
    <span>View:</span>
    <display-mode
      class="display-switch__btn"
      :class="{'display-switch__btn--selected': displayMode === 'grid'}"
      data-display-type="grid"
      @click="changeDisplay"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColour"
          d="M9.2 10.8v8.4H.8v-8.4h8.4Zm10
              0v8.4h-8.4v-8.4h8.4ZM9.2.8v8.4H.8V.8h8.4Zm10 0v8.4h-8.4V.8h8.4Z"
          fill-rule="evenodd"
        />
      </svg>
    </display-mode>

    <display-mode
      class="display-switch__btn"
      :class="{'display-switch__btn--selected': displayMode === 'list'}"
      data-display-type="list"
      @click="changeDisplay"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.2 14.256v4.992H.8v-4.992h18.4Zm0-6.728v4.992H.8V7.528h18
              .4ZM19.2.8v4.992H.8V.8h18.4Z"
          fill-rule="evenodd"
        />
      </svg>
    </display-mode>

    <display-mode
      class="display-switch__btn"
      :class="{'display-switch__btn--selected': displayMode === 'column'}"
      data-display-type="column"
      @click="changeDisplay"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColour"
          d="M.8.8h18.4v18.4H.8z"
          fill-rule="evenodd"
        />
      </svg>
    </display-mode>
  </div>
</template>

<script lang="ts">
  /* eslint-disable max-len, vue/max-len */
  import Vue from 'vue';
  import DisplayMode from '@/components/atoms/btn/DisplayMode.vue';

  // Stores
  import { readDisplayMode } from '@/store/modules/product-list-page/getters';
  import { commitDisplayMode } from '@/store/modules/product-list-page/mutations';
  /* eslint-enable max-len, vue/max-len */

  export default Vue.extend({
    name: 'DisplaySwitch',

    components: {
      DisplayMode
    },

    computed: {
      displayMode () {
        return readDisplayMode(this.$store);
      }
    },

    methods: {
      /**
       * Sends an event to the parent to change the display type
       */
      changeDisplay (event: PointerEvent | MouseEvent) {
        const target = event.target as HTMLButtonElement;

        if (target) {
          const displayType = target.dataset
            .displayType as ('grid'|'list'|'column');

          if (displayType && /^(grid)|(list)|(column)$/.test(displayType)) {
            commitDisplayMode(this.$store, displayType);
          }
        }
      }
    }
  });
</script>

<style lang="scss" src="./display-switch.scss" />
