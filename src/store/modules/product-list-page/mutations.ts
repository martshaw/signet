/* eslint-disable max-len, vue/max-len */
import type { State, State as RootState } from '@/store/modules/product-list-page/state';
import { getStoreAccessors } from 'typesafe-vuex';

// @ts-ignore
import { getPageInstanceID } from '@/assets/scripts/getDataLayerProperty/digital-data';
import { isStatisticsEnabled } from '@/helpers/cookie-methods';

/* eslint-enable max-len, vue/max-len */

const mutations = {
  setPriceLowest (state: State, price: number | undefined) {
    if (typeof price === 'number') {
      state.lowestPrice = price;
    }
  },

  setPriceHighest (state: State, price: number | undefined) {
    if (typeof price === 'number') {
      state.highestPrice = price;
    }
  },

  setDisplayType (state: State, mode: State['displayType']) {
    state.displayType = mode;
  },

  /**
   * Add an entry into the data layer when the product filters are
   * interactive with.
   */
  setMobileRefinements (state: State) {
    window.dataLayer = window.dataLayer || [];

    if (isStatisticsEnabled()) {
      window.dataLayer.push({
        filterCategory: `Filter | ${getPageInstanceID()}`,
        filterAction: 'Filter Interaction',
        filterValue: 'Toggle',
        event: 'filterToggle'
      });
    }

    state.showMobileRefinements = !state.showMobileRefinements;
  },

  setSeoBanner (state: State, payload: {
    h2: string, intro: string, body: string
  } | undefined) {
    const title = payload?.h2;
    const body = payload?.body;
    const intro = payload?.intro;

    state.seoBanner.title = title?.length === 0 ? undefined : title;
    state.seoBanner.body = body?.length === 0 ? undefined : body;
    state.seoBanner.intro = intro?.length === 0 ? undefined : intro;
  },

  setMainBanner (state: State, payload: State['mainBanner'] | undefined) {
    const imageUrl = payload?.imageURL;
    const mobileUrl = payload?.mobileImageURL;
    const imageAlt = payload?.imageAltText;
    const linkUrl = payload?.linkURL;
    const heading = payload?.heading;
    const cta = payload?.callToAction;
    const ctaFill = payload?.ctaFillColour;
    const ctaText = payload?.ctaTextColour;
    const ctaPosition = payload?.ctaPosition;

    state.mainBanner.imageAltText = imageAlt || '';
    state.mainBanner.imageURL = imageUrl?.length === 0 ? undefined : imageUrl;
    state.mainBanner.linkURL = linkUrl?.length === 0 ? undefined : linkUrl;
    state.mainBanner.heading = heading?.length === 0 ? undefined : heading;
    state.mainBanner.callToAction = cta?.length === 0 ? undefined : cta;
    state.mainBanner.mobileImageURL =
      mobileUrl?.length === 0 ? undefined : mobileUrl;
    state.mainBanner.ctaPosition =
      ctaPosition?.length === 0 ? undefined : ctaPosition;
    state.mainBanner.ctaFillColour =
      ctaFill?.length === 0 ? undefined : ctaFill;
    state.mainBanner.ctaTextColour =
      ctaText?.length === 0 ? undefined : ctaText;
  }
};

export default mutations;

const { commit } = getStoreAccessors<State, RootState>('');

export const commitLowestPrice = commit(mutations.setPriceLowest);
export const commitHighestPrice = commit(mutations.setPriceHighest);
export const commitDisplayMode = commit(mutations.setDisplayType);
export const commitMobileRefinements = commit(mutations.setMobileRefinements);
export const commitSeoBanner = commit(mutations.setSeoBanner);
export const commitMainBanner = commit(mutations.setMainBanner);
