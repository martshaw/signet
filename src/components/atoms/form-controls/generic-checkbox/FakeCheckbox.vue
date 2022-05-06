<template>
  <label :for="'labelledby-' + id">
    <slot name="before" />
    <input
      :id="'labelledby-' + id"
      type="radio"
      :name="name"
      :value="value"
      :required="required"
      :aria-required="required.toString()"
      class="u-visually-hidden"
      :checked="checked"
      @change="$emit('change', $event.target)"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      :class="className"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        d="M1.73 12.91l6.37 6.37L22.79 4.59"
      />
    </svg>
    <slot name="after" />
  </label>
</template>

<script>
// @ts-check

  export default {
    name: 'FakeCheckbox',

    props: {
      className: {
        type: String,
        required: false
      },

      id: {
        type: String,
        required: true
      },

      name: {
        type: String,
        required: false
      },

      value: {
        type: String,
        required: false
      },

      /**
       * If true, sets the checkbox
       * to checked on initial render.
       */
      checked: {
        type: Boolean,
        required: false
      },

      required: {
        type: Boolean,
        required: false
      }
    }
  };
</script>

<style lang="scss" src="../../../../assets/styles/_utilities.scss" />
