import Vue from 'vue';
import Vuex from 'vuex';
import state from '@/store/modules/product-list-page/state';
import getters from '@/store/modules/product-list-page/getters';
import mutations from '@/store/modules/product-list-page/mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state,
  getters,
  mutations
});
