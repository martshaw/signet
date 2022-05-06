<template>
  <div
    class="product-step-up-down"
    :class="className"
  >
    <div
      v-for="(item, index) in stepUpDown"
      :key="index"
      :class="getCustomClassName"
    >
      <!--
				We may get a label with no options, so checking for the options
				before printing the label
			-->
      <template
        v-if="item.options"
      >
        <div
          v-if="item.label === 'Material' &&
            selectedStepUpDown.material !== undefined"
          class="product-step-up-down__text"
        >
          <h4 class="product-step-up-down__heading">
            <label
              :for="'labelledby-product-step-up-down__' +
                removeSpaceInbetweenAString(item.label)"
            >
              {{
                item.label
              }}
            </label>
          </h4>
        </div>
        <div
          v-if="item.label === 'Total diamond carat weight'
            && selectedStepUpDown.carat !== undefined"
          class="product-step-up-down__text"
        >
          <h4 class="product-step-up-down__heading">
            <label
              :for="'labelledby-product-step-up-down__' +
                removeSpaceInbetweenAString(item.label)"
            >
              {{
                item.label
              }}
            </label>
          </h4>
        </div>
        <div class="product-step-up-down__data">
          <select
            v-if="item.label === 'Material' &&
              selectedStepUpDown.material !== undefined"
            :id="'labelledby-product-step-up-down__' +
              removeSpaceInbetweenAString(item.label)"
            v-model="selectedStepUpDown.material"
            class="product-step-up-down__select"
            @change="onStepUpDownSelect(item.label)"
          >
            <option
              :value="item.value"
              selected
            >
              {{ item.value }}
            </option>
            <option
              v-for="data in item.options"
              :key="data.sku"
              :value="data.sku"
            >
              {{ data.value }}
            </option>
          </select>
          <select
            v-if="item.label === 'Total diamond carat weight'
              && selectedStepUpDown.carat !== undefined"
            :id="'labelledby-product-step-up-down__' +
              removeSpaceInbetweenAString(item.label)"
            v-model="selectedStepUpDown.carat"
            class="product-step-up-down__select"
            @change="onStepUpDownSelect(item.label)"
          >
            <option
              :value="item.value"
              selected
            >
              {{ item.value }}
            </option>
            <option
              v-for="data in item.options"
              :key="data.sku"
              :value="data.sku"
            >
              {{ data.value }}
            </option>
          </select>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StepUpDown',

    props: {
      stepUpDown: {
        type: Array,
        required: true
      },
      pdpUrlPart: {
        type: String,
        required: true
      },
      className: {
        type: String,
        required: false
      }
    },

    data () {
      return {
        selectedStepUpDown: {
          /** @type {string} */
          material: this.stepUpDown[0]?.value,
          /** @type {string} */
          carat: this.stepUpDown.length === 1 ? this.stepUpDown[0]?.value
            : this.stepUpDown[1]?.value
        }
      };
    },

    computed: {
      /**
       * This method returns the class name based on className passed
       * @returns {String} the classname which needs to be applied
       * to the directive.
       */
      getCustomClassName () {
        let className = 'product-step-up-down__container';
        if (this.className) {
          className += ` ${this.className}__container`;
        }
        return className;
      }
    },

    methods: {
      /**
       * This method takes in the label of the select option as a parameter
       * @param {String} heading to check the appropriate v-model variable
       * for destructuring and creating the url the page need to render or
       * go to.
       */
      onStepUpDownSelect (heading) {
        const sku = (heading === 'Material')
          ? JSON.parse(this.selectedStepUpDown.material)
          : JSON.parse(this.selectedStepUpDown.carat);
        location.href = `/webstore/${this.pdpUrlPart}/${sku}/`;
      },
      /**
       * take a string as a parameter
       * @param {String} label and remove the whitespaces in between them
       * and add - instead and return the transformed string.
       * @return {String}.
       */
      removeSpaceInbetweenAString (label) {
        return label.split(' ').join('-');
      }
    }
  };
</script>

<style lang="scss" src="./step-up-down.scss"/>
