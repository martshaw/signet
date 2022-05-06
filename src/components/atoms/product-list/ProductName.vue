<template>
  <div
    class="product-name"
    :class="className"
  >
    <p
      v-if="showCollectInTudor"
      class="product-name__tudor"
    >
      Collect in Tudor specialist store
    </p>
    <!-- eslint-disable vue/no-v-html -->
    <p
      :class="getProductNameClassName"
      v-html="name"
    />
    <!--eslint-enable-->
  </div>
</template>

<script>
  export default {
    name: 'ProductName',
    props: {
      name: {
        type: String,
        required: true
      },
      showCollectInTudor: {
        type: Boolean,
        required: true
      },
      className: {
        type: String,
        required: false
      }
    },
    computed: {
      /**
       * This method returns the class name based on showCollectInTudor
       * variable's binding
       * @returns {String} the classname which needs to be applied
       * to the directive.
       */
      getProductNameClassName () {
        let className = 'product-name';
        if (this.className) {
          className += ` ${this.className}`;
        }
        return className;
      }
    }
  };
</script>

<style
  lang="scss"
  src="./product-name.scss"
/>
