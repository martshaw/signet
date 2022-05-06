<template>
  <section>
    <div v-if="!showRequestSuccess">
      <form
        ref="js-form__emwa"
        method="POST"
        @submit.prevent="submitRequest"
      >
        <div
          class="emwa"
          :class="{'emwa__error': errorObject.$error}"
        >
          <email-me-when-available-header />
          <error-message
            v-if="status === 'error'"
          >
            <p>
              {{ instruction }}
            </p>
          </error-message>
          <input
            type="hidden"
            name="masterProductNumber"
            :value="masterSku"
          />
          <email-me-when-available-consent
            v-model.trim="emailMeWhenAvailableRequestForm.email"
            :value="emailMeWhenAvailableRequestForm.email"
            :is-form-valid="isFormValid"
            @input="handleFormValidation"
          >
            <template v-slot:errors>
              <error-message v-if="isFormValid">
                <li v-if="isEmailEmpty">
                  {{ errorMessage.email.required }}
                </li>
                <li v-if="!isFormValid">
                  {{ errorMessage.email.email }}
                </li>
              </error-message>
            </template>
          </email-me-when-available-consent>
          <marketing-sign-in
            :mnc-val="emailMeWhenAvailableRequestForm.mncVal"
            :apply-important="true"
            @update="updateMarketingValue"
          />
          <button
            class="c-btn t-primary-btn"
            :disabled="!isFormValid"
          >
            Send
          </button>
        </div>
      </form>
    </div>
    <div
      v-if="showRequestSuccess"
      class="emwa"
    >
      <email-me-when-available-header />
      <p
        v-if="status !== 'error'"
        class="emwa__consent"
      >
        {{ instruction }}
      </p>
    </div>
  </section>
</template>

<script>
  // eslint-disable-next-line max-len, vue/max-len
  import EmailMeWhenAvailableConsent from '@/components/atoms/email-me-when-available/EmailMeWhenAvailableConsent';
  import MnC from '@/components/atoms/messages/MnC';
  import ErrorMessage from '@/components/atoms/messages/ErrorMessageContainer';
  import errorMessage from '@/errorMessage';
  import { EMAIL_ME_WHEN_AVAILABLE } from '@/service/api-urls';
  import EmailMeWhenAvailableHeader from
    '@/components/atoms/headers/EmailMeWhenAvailableHeader';
  import axios from 'axios';
  export default {
    name: 'EmailMeWhenAvailable',
    components: {
      ErrorMessage,
      EmailMeWhenAvailableConsent,
      EmailMeWhenAvailableHeader,
      'marketing-sign-in': MnC
    },
    props: {
      masterSku: {
        type: String,
        required: true
      },
      emailMeWhenAvailableRequest: {
        required: false,
        type: Object
      }
    },
    data () {
      return {
        emailMeWhenAvailableRequestForm: {
          email: '',
          mncVal: false,
          masterSku: ''
        },
        errorMessage: errorMessage,
        disabled: false,
        status: '',
        showRequestSuccess: false,
        errorObject: {
        },
        isFormValid: undefined
      };
    },
    computed: {
      /** @returns {string} */
      getCsrfFromMetaData: function () {
        if (document.querySelector('meta[name="_csrf"]')) {
          return document
            .querySelector('meta[name="_csrf"]')
            .getAttribute('content');
        } else {
          return '';
        }
      },
      /**
       * Checks if the email input has any value in it or not.
       * @returns {Boolean}
       */
      isEmailEmpty: function () {
        return this.emailMeWhenAvailableRequestForm.email === '';
      }
    },
    created () {
      this.emailMeWhenAvailableRequestForm.masterSku = this.masterSku;
    },
    methods: {
      /** Event handler for update event emmited by child
      * @param {Boolean} checked
      */
      updateMarketingValue (checked) {
        this.emailMeWhenAvailableRequestForm.mncVal = checked;
      },
      /**
       * Method to submit a user's request for emailing when the
       * product is back in stock. Returns a success message or error and resets
       * the form.
       */
      async submitRequest () {
        if (this.isFormValid) {
          this.status = 'processing';
          const config = {
            headers: {
              'X-CSRF-TOKEN': this.getCsrfFromMetaData
            }
          };
          const data = {
            newsletter: this.emailMeWhenAvailableRequestForm.mncVal,
            masterProductNumber: this.masterSku,
            customerEmail: this.emailMeWhenAvailableRequestForm.email
          };
          await axios
            .post(EMAIL_ME_WHEN_AVAILABLE, data, config)
            .then((response) => {
              if (response.data.success) {
                this.showRequestSuccess = response.data.success;
                this.status = 'processed';
                this.instruction = 'Thank you, we will notify you by email,' +
                  ' once this item is back in stock.';
              } else {
                this.status = 'error';
                this.instruction =
                  response.data.messages.error.message;
              }
              this.$refs['js-form__emwa'].reset();
            }).catch((errorMessage) => {
              this.status = 'error';
              this.instruction = 'Invalid form data.' +
                ' Please check and try again';
              throw new Error(errorMessage);
            });
        }
      },
      /**
       * Checks if the form is valid by checking the validations of
       * the input field email and assigns to the isFormValid data
       * property.
       */
      handleFormValidation () {
        this.isFormValid = this.$refs['js-form__emwa'].checkValidity() &&
          this.emailMeWhenAvailableRequestForm.email !== '';
      }
    }
  };
</script>

<style lang="scss"  scoped src="./email-me-when-available.scss"/>
