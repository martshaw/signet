import Axios from 'axios';
import { ADD_TO_BASKET } from './api-urls';
import { createCookie, findCookie, readCookies } from './cookieMethods';

const WS_BASKET_ID = 'WS_BASKET_ID';
const WS_BASKET_SIZE = 'WS_BASKET_SIZE';
const WS_BASKET_TOTAL = 'WS_BASKET_TOTAL';
const WS_BASKET_ID_DEV = 'WS_BASKET_ID_DEV';
const PDP_WARRANTY_OBJECT = 'pdpWarrantyObject';
const shoppingBagCountId = '#js-shopping-bag-count';

/**
 * Because the basket value is recalculated
 * Remove all the stored values
 */
const clearStorage = () => {
  sessionStorage.removeItem('Financeplan');
  sessionStorage.removeItem('provider');
  sessionStorage.removeItem('paypalSelected');
  sessionStorage.removeItem('voucherCode');
};
/**
 * Creates four cookies
 * 1. 'WS_BASKET_ID'
 * 2. 'WS_BASKET_SIZE'
 * 3. 'WS_BASKET_TOTAL'
 * 4. 'WS_BASKET_ID_DEV - only in development environment
 *
 * Then redirect the customer to the basket page
 * @param {Response} responseData
 */
const createCookies = response => {
  /**
   * @member {ResponseReturned}
   */
  const { data } = response;

  /**
   * @member {BasketID}
   */
  const basketID = data.session.WS_BASKET_ID;

  /**
   * @type {Date}
   */
  const maxAge = new Date(Date.now() + basketID.maxAge);

  if (location.hostname.indexOf('localhost') === 0) {
    window.sessionStorage.setItem(WS_BASKET_ID_DEV, basketID.value);
  }

  createCookie(WS_BASKET_ID, basketID.value, maxAge);
  createCookie(WS_BASKET_SIZE, data.session.WS_BASKET_SIZE, maxAge);
  createCookie(WS_BASKET_TOTAL, data.session.WS_BASKET_TOTAL, maxAge);
};

/**
 * Get the basket Id from the cookie `WS_BASKET_ID`
 * @returns {string|null}
 */
const getBasketId = () => {
  if (findCookie(WS_BASKET_ID)) {
    return readCookies(WS_BASKET_ID)[0];
  }
  return null;
};
/**
 * Get the selected warranty plan details
 * or null if no warranty selected
 * @returns {object|null}
 */
const getWarrantyDetails = () => {
  let warrantyObject;
  if (sessionStorage.getItem(PDP_WARRANTY_OBJECT)) {
    warrantyObject = JSON.parse(sessionStorage.getItem(PDP_WARRANTY_OBJECT));
  } else {
    // Set each property to null as that is how
    // backend expects it.
    warrantyObject = {
      warrantyDesc: null,
      warrantySku: null,
      action: null,
      termSelected: null,
      productPrice: null
    };
  }
  // Destroy warranty object session data
  sessionStorage.removeItem(PDP_WARRANTY_OBJECT);
  return warrantyObject;
};
/**
 * Update the basket count on UI
 *
 * @param {Response} response
 */
const updateBasket = response => {
  const { data } = response;
  if (data) {
    const message = data.messages;
    const basketCount = document.querySelector(shoppingBagCountId);
    const basketSize = data.session.WS_BASKET_SIZE;

    if (typeof message === 'object' && typeof message.error === 'object') {
      if (typeof message.error.basketErrorReason === 'string') {
        if (basketCount instanceof HTMLDivElement) {
          basketCount.innerText = basketSize;
        }

        if (basketCount instanceof HTMLSpanElement) {
          basketCount.textContent = basketSize;
        }
        throw new RangeError(message.error.basketErrorReason);
      }
    }
  }
};

/**
 * Send the product data to the back end
 * controller `/webstore/basket/items`
 *
 * @param {RequestData} requestData
 *
 * @returns {Object} response object
 * { error: boolean, message: string, data: Object }
 */
const addToBasket = async requestData => {
  try {
    const response = await Axios.post(ADD_TO_BASKET, requestData);
    updateBasket(response);
    createCookies(response);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

/**
 * Wrapper function to handle prerequisites and add items to basket
 *
 * @param {string} masterProductNumber - master sku
 * @param {string} productNumber - product sku
 * @param {string} quantity - quantity to add
 *
 * @returns {Object} response object
 * { error: boolean, message: string, data: Object }
 */
const handleAddToBasket = async (
  masterProductNumber,
  productNumber,
  quantity
) => {
  clearStorage();
  const requestData = {
    masterProductNumber,
    productNumber,
    quantity,
    basketId: getBasketId(),
    ...getWarrantyDetails()
  };
  return addToBasket(requestData);
};

export {
  /**
   * @memberOf module:addToBasketService
   * @see module:addToBasketService~clearStorage
   */
  clearStorage,
  /**
   * @memberOf module:addToBasketService
   * @see module:addToBasketService~getBasketId
   */
  getBasketId,
  /**
   * @memberOf module:addToBasketService
   * @see module:addToBasketService~getWarrantyDetails
   */
  getWarrantyDetails,
  /**
   * @memberOf module:addToBasketService
   * @see module:addToBasketService~handleAddToBasket
   */
  handleAddToBasket
};
