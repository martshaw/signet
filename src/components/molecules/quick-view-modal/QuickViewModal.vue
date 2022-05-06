<template>
  <dialog
    id="js-quick-view-dialog"
    ref="modalQuickView"
    class="c-modal c-quick-view-modal"
    :class="{'show-spinner': loading}"
    @click="handleDialogClose"
  >
    <div
      v-if="loading"
      class="spinner"
    >
      <spinner />
    </div>
    <div v-if="!loading && productInfo">
      <button
        class="c-quick-view-modal__close-cross"
        @click="closeModal"
      >
        <img
          src="@/assets/images/icon-black-cross.svg"
          alt="Close"
          loading="lazy"
          width="19px"
          height="19px"
        />
      </button>
      <div class="c-quick-view-modal__container">
        <product-flag
          v-if="isBadgeRequired"
          :offer="badges"
          theme="product-stock-badge"
        />
        <product-gallery
          :gallery="productInfo.gallery"
          :name="productInfo.name"
          :sku="productInfo.childSku"
          :url="productInfo.url"
        ></product-gallery>
        <div class="c-quick-view-modal__container__right">
          <product-information
            v-model="form.productNumber"
            :product-info="productInfo"
            :class-name="['c-quick-view-modal__container__right__product-info']"
          >
          </product-information>
          <template>
            <error-message
              v-if="!form.productNumber"
              class="c-quick-view-modal__container__right__error"
            >
              <li>
                {{ error }}
              </li>
            </error-message>
          </template>

          <email-me-when-available
            v-if="isEMWAEnabled && isOutOfStockAndNotInStore"
            :master-sku="productInfo.masterSku"
          />

          <div class="c-quick-view-modal__container__right__button">
            <add-to-basket-button
              v-if="productInfo.availableToBuyWeb"
              :available-to-buy-web="productInfo.availableToBuyWeb"
              :button-text="productInfo.availableToBuyWeb ? 'Add to Basket' :
                'Out of Stock'"
              @click="onAddToBasket"
            />
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script>
  import axios from 'axios';
  import eventBus from '@/eventBus';
  import ProductGallery from
    '@/components/molecules/product-gallery/ProductGallery';
  import ProductInformation from
    '@/components/molecules/product-information/ProductInformation';
  import AddToBasketButton from
    '@/components/atoms/add-to-basket-button/AddToBasketButton';
  import Spinner from '@/components/atoms/utility/Spinner';
  import { handleAddToBasket } from '@/service/add-to-basket';
  import ErrorMessage from '../../atoms/messages/ErrorMessageContainer';
  import errorMessage from '@/errorMessage';

  export default {
    name: 'QuickViewModal',

    components: {
      ProductGallery,
      ProductInformation,
      AddToBasketButton,
      Spinner,
      ErrorMessage,
      ProductFlag: () => import(
        '@/components/atoms/product/ProductFlag'
      ),
      EmailMeWhenAvailable: () => import(
      '@/components/molecules/email-me-when-available/emwa/EmailMeWhenAvailable'
      )
    },

    data () {
      return {
        productInfo: null,
        form: { productNumber: '' },
        quantity: 1,
        loading: true,
        errorMessage: errorMessage,
        currentScrollPosition: 0,
        error: ''
      };
    },

    computed: {
      getModal () {
        return this.$refs.modalQuickView;
      },

      /**
       * Retrieves the emailMeWhenAvailable toggle flag
       * from config and sends back boolean
       * @returns {Boolean} true if showing EmailMeWhenAvailable
       * config, else false
       */
      isEMWAEnabled: () => window.Signet.isEmailMeWhenAvailableEnabled,

      /**
       * Return true,if the product is Out of stock
       *  and not In-Store only , else false
       * @returns {Boolean}
       */
      isOutOfStockAndNotInStore () {
        return !this.productInfo.availableToBuyWeb &&
          !this.productInfo.displayInstoreOnlyMessage;
      },
      /** Return text to display as a badge
       *
       * @returns {String}
       *
       */
      badges () {
        if (this.isOutOfStockAndNotInStore) {
          return 'Out of Stock';
        } else if (this.productInfo.displayInstoreOnlyMessage) {
          return 'In-Store only';
        } else if (this.productInfo.displayOnlineOnlyMessage) {
          return 'On-line only';
        } else {
          return null;
        }
      },

      /** Check whether badge should be displayed or not
       *
       * @returns {Boolean} true if product is out of stock or
       * in-store only or online only , else false
       */
      isBadgeRequired () {
        return this.isOutOfStockAndNotInStore ||
          this.productInfo.displayInstoreOnlyMessage ||
          this.productInfo.displayOnlineOnlyMessage;
      }
    },

    mounted () {
      // Check if the browser supports the dialog element if not load in the
      // polyfill
      if (typeof window.HTMLDialogElement === 'undefined') {
        import('dialog-polyfill')
          .then((module) => {
            module.default.registerDialog(this.$refs.modalQuickView);
          })
          .catch(error => new Error(error));
      }
      eventBus.$on('QuickViewModalOpen', async (productInfo) => {
        this.quickViewModalOpenHandler(productInfo);
      });
    },
    methods: {
      async quickViewModalOpenHandler (productInfo) {
        this.currentScrollPosition = document.documentElement.scrollTop;
        window.scrollTo(0, 0);
        this.loading = true;
        this.getModal.showModal();
        try {
          const {
            longDescription,
            stepUpDown,
            gallery,
            childrenSku,
            masterSku,
            pdpUrlPart,
            availableToBuyWeb,
            displayInstoreOnlyMessage,
            displayOnlineOnlyMessage
          } = await this.getProductDetails(productInfo.url);
          this.productInfo = productInfo;
          this.productInfo.longDescription = longDescription;
          this.productInfo.stepUpDown = stepUpDown;
          this.productInfo.pdpUrlPart = pdpUrlPart;
          this.productInfo.gallery = gallery;
          this.productInfo.childrenSku = childrenSku;
          this.productInfo.masterSku = masterSku;
          this.productInfo.availableToBuyWeb = availableToBuyWeb;
          this.productInfo.displayInstoreOnlyMessage =
            displayInstoreOnlyMessage;
          this.productInfo.displayOnlineOnlyMessage =
            displayOnlineOnlyMessage;
          if (!this.productInfo.childrenSku.length) {
            this.form.productNumber = this.productInfo.parentSku;
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          this.closeModal();
        }
        this.loading = false;
      },

      /**
       * Gets the product based on url
       * @param {String} url - url of the product
       * @returns {Object}
       * product related details
       * like description, stepUpDown, gallery(images etc),
       * children skus and url for pdp redirection.
       */
      async getProductDetails (url) {
        const response = await axios.get(url);
        const {
          data: {
            product: {
              properties: {
                P_Long_Description: longDescription
              },
              skuList: {
                childrenSku,
                masterSku
              },
              availableToBuyWeb,
              displayInstoreOnlyMessage,
              displayOnlineOnlyMessage
            },
            pageConfig: {
              pdpUrlPart
            },
            stepUpDown,
            gallery
          }
        } = response;

        return {
          longDescription,
          stepUpDown,
          gallery,
          childrenSku,
          masterSku,
          pdpUrlPart,
          availableToBuyWeb,
          displayInstoreOnlyMessage,
          displayOnlineOnlyMessage
        };
      },
      /**
       * Method to close the modal
       */
      closeModal () {
        window.scrollTo(0, this.currentScrollPosition);
        this.$refs.modalQuickView.close();
        this.reset();
      },

      /**
       * If the user will click outside of modal, close the dialog
       */
      handleDialogClose (e) {
        // checking the dialog id, if it matches with event id
        // will close modal
        if (e.target.id === 'js-quick-view-dialog') {
          this.closeModal();
        }
      },

      /**
       * Method to add the product to basket
       * this method either redirects the page to the basket page
       * or throws an error either related to the data or the ring size
       * validation ie. if the ring size is not selected.
       */
      async onAddToBasket () {
        if (this.form.productNumber) {
          this.loading = true;
          this.error = '';
          try {
            const { data } = await handleAddToBasket(
              this.productInfo.parentSku,
              this.form.productNumber,
              this.quantity);
            window.location = `/webstore${data.redirectUrl}`;
            window.scrollTo(0, this.currentScrollPosition);
          } catch (error) {
            this.loading = false;
          }
        } else {
          this.error = this.errorMessage.ringSize.required;
        }
      },
      /**
       * resets the values of the data hook if they are changed over the
       * course that the user was on the page.
       */
      reset () {
        this.productInfo = null;
        this.loading = false;
        this.form.productNumber = '';
        this.error = '';
      }
    }
  };
</script>

<style lang="scss" src="./quick-view-modal.scss"/>
