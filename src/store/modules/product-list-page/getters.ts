/* eslint-disable max-len, vue/max-len */
import type { State, State as RootState } from '@/store/modules/product-list-page/state';
import { getStoreAccessors } from 'typesafe-vuex';
/* eslint-enable max-len, vue/max-len */

const getters = {
  getLowestPrice (state: State) {
    return state.lowestPrice;
  },

  getHighest (state: State) {
    return state.highestPrice;
  },

  getDisplayMode (state: State) {
    return state.displayType;
  },

  getMobileRefinements (state: State) {
    return state.showMobileRefinements;
  },

  getSeoBanner (state: State) {
    return state.seoBanner;
  },

  getMainBanner (state: State) {
    return state.mainBanner;
  }
};

export default getters;

const { read } = getStoreAccessors<State, RootState>('');

export const readLowestPrice = read(getters.getLowestPrice);
export const readHighest = read(getters.getHighest);
export const readDisplayMode = read(getters.getDisplayMode);
export const readMobileRefinements = read(getters.getMobileRefinements);
export const readSeoBanner = read(getters.getSeoBanner);
export const readMainBanner = read(getters.getMainBanner);
