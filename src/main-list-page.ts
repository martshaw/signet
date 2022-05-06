import Vue from 'vue';
import App from './views/productListing/ListPage.vue';
import store from './store/modules/product-list-page';
// @ts-ignore
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable max-len, vue/max-len */
  window.Signet = {
    VUE_APP_ALGOLIA_APP_ID: 'MD29PXDVZD',
    VUE_APP_ALGOLIA_APP_KEY: 'ec0d601a120093d75dc20053d8dd6654',
    VUE_APP_ALGOLIA_SEARCH_INDEX_PRODUCTS: 'dev_ERNEST_JONES_products',
    VUE_APP_ALGOLIA_TOP_RATED_INDEX_PRODUCTS:
      'dev_ERNEST_JONES_products_Top_Rated',
    VUE_APP_ALGOLIA_PRICE_DESC_INDEX_PRODUCTS:
      'dev_ERNEST_JONES_products_Price_Desc',
    VUE_APP_ALGOLIA_PRICE_ASC_INDEX_PRODUCTS:
      'dev_ERNEST_JONES_products_Price_Asc',
    VUE_APP_ALGOLIA_NEW_ARRIVAL_INDEX_PRODUCTS:
      'dev_ERNEST_JONES_products_New_Arrivals',
    InGridBanner: [
      {
        backgroundImage:
          '/content-root/common/images/banners/in-grid-banner-extended-returns.jpg',
        button: 'Learn More',
        buttonAction: '/refunds/?icid=ej-fn-ess-returns',
        heading: 'Extended Returns',
        indexPosition: '3',
        text: 'Return any items bought now up 777 to Monday 24th January 2022'
      },
      {
        backgroundImage:
          '/content-root/common/images/banners/in-grid-banner-extended-returns.jpg',
        button: 'Learn More',
        buttonAction: '/refunds/?icid=ej-fn-ess-returns',
        heading: 'Extended Returns',
        indexPosition: '7',
        text: 'Return any items bought now up 777 to Monday 24th January 2022'
      }
    ]
  };
  /* eslint-enable max-len, vue/max-len */
}

new Vue({
  name: 'ListPage',
  store,
  render: (h) => h(App)
}).$mount('#app');
