<template>
  <div>
    <input
      placeholder="Email"
      required
      class="emwa__input"
      :class="!isFormValid && isFormValid !== undefined ? 'emwa__error' : ''"
      type="email"
      @input="passValue"
    />
    <p class="emwa__consent">
      By entering your email address you hereby give consent to be
      contacted in relation to the availability of this product.
    </p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  // eslint-disable-next-line vue/require-direct-export
  export default Vue.extend({
    name: 'EmailMeWhenAvailableConsent',
    props: {
      value: {
        type: String,
        required: true
      },
      isFormValid: {
        type: Boolean,
        required: false
      }
    },
    methods: {
      /**
       * Emits the value of the email input to the parent.
       */
      passValue (event: InputEvent) {
        const target = event.target as HTMLInputElement;
        this.$emit('input', target.value);
      }
    }
  });
</script>

<style lang="scss" scoped src='./email-me-when-available-consent.scss'/>

<style lang="scss"
src="../../../assets/styles/components/inputs.scss"/>
