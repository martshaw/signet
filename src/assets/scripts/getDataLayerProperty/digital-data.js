/**
 * Checks if the digital data object exist on the page, if not returns null.
 * @function
 * @returns {Object|null}
 */
// eslint-disable-next-line no-undef
const getDigitalLayer = () => typeof digitalData === 'object' ? digitalData
  : null;

/**
 * Returns the page object from the digitalData object or returns null.
 * @example digitalData.page
 * @function
 * @return {Object|null}
 */
const getPageObject = () => getDigitalLayer() && getDigitalLayer().page
  ? getDigitalLayer().page : null;

/**
 * Returns the pageInfo object from the page object or returns null.
 * @example digitalData.page.pageInfo
 * @function
 * @return {Object|null}
 */
const getPageInfoObject = () => getDigitalLayer() && getPageObject().pageInfo
  ? getPageObject().pageInfo : null;

/**
 * Returns the category object from the page object or returns null.
 * @example digitalData.page.category
 * @function
 * @return {Object|null}
 */
const getCategoryObject = () => getDigitalLayer() && getPageObject().category
  ? getPageObject().category : null;

/**
 * Returns the product array from the digitalData object or returns an
 * empty array.
 * @example digitalData.product
 * @function
 * @returns {Object[]|Array}
 */
const getProductArray = () => getDigitalLayer() && getDigitalLayer().product
  ? getDigitalLayer().product : [];

/**
 * Returns the productInfo object from the product array or returns an
 * empty array.
 * @example digitalData.product[i].productInfo
 * @function
 * @returns {Object[]|Array}
 */
const getProductInfoArray = () => getProductArray()
  .map(product => product.productInfo || []);

/**
 * Returns the price Object from the product array or returns an empty
 * array.
 * @example digitalData.product[i].price
 * @function
 * @returns {Object[]|Array}
 */
const getPriceArray = () => getProductArray()
  .map(product => product.price || []);

/**
 * Returns the cart object from the digitalData object or returns null.
 * @example digitalData.cart
 * @function
 * @returns {object|null}
 */
const getCartObject = () => getDigitalLayer() && getDigitalLayer().cart
  ? getDigitalLayer().cart : null;

/**
 * Returns the attributes object from the cart object or returns null.
 * @example digitalData.cart.attributes
 * @function
 * @returns {object|null}
 */
const getCartAttributesObject = () => getDigitalLayer() && getCartObject()
  .attributes
  ? getCartObject().attributes : null;

/**
 * Returns the item array from the cart object or returns an empty array.
 * @example digitalData.cart.item
 * @function
 * @returns {object[]|Array}
 */
const getCartItemArray = () => getDigitalLayer() && getCartObject().item
  ? getCartObject().item : [];

/**
 * Returns the productInfo object from the item array or returns an
 * empty array.
 * @example digitalData.cart.item[i].productInfo
 * @function
 * @returns {object[]|Array}
 */
const getCartProductInfoArray = () => getCartItemArray()
  .map(cartItem => cartItem.productInfo ? cartItem.productInfo : []);

/**
 * Returns the category object from the item array or returns an empty
 * array.
 * @example digitalData.cart.item[i].category
 * @function
 * @returns {object[]|Array}
 */
const getCartCategoryArray = () => getCartItemArray()
  .map(cartItem => cartItem.category ? cartItem.category : []);

/**
 * Returns the price object from the item array or returns an empty array.
 * @example digitalData.cart.item[i].price
 * @function
 * @returns {object[]|Array}
 */
const getCartPriceArray = () => getCartItemArray()
  .map(cartItem => cartItem.price ? cartItem.price : {
  });

/**
 * Returns the user array from the digitalData object or returns an
 * empty array.
 * @example digitalData.user
 * @function
 * @return {Object[]|Array}
 */
const getUserArray = () => getDigitalLayer() && getDigitalLayer().user
  ? getDigitalLayer().user : [];

/**
 * Returns the profile array from the user array or returns an empty array
 * @example digitalData.user[i].profile
 * @function
 * @return {object[]|Array}
 */
const getProfileArray = () => getUserArray()
  .map(user => user ? user.profile : [])
  .flat(1);

/**
 * Returns the profileInfo object from profile array or returns an empty
 * array.
 * @example digitalData.user[i].profile[i].profileInfo
 * @function
 * @return {Object[]|Array}
 */
const getProfileInfoArray = () => getProfileArray()
  .map(profile => profile.profileInfo ? profile.profileInfo : []);

/**
 * Returns the pageInstanceID from the digitalData object or returns null.
 * @example digitalData.pageInstanceID
 * @function
 * @returns {String|null}
 */
const getPageInstanceID = () => getDigitalLayer() && getDigitalLayer()
  .pageInstanceID
  ? getDigitalLayer().pageInstanceID : null;

/**
 * Returns ths pageType form the pageInfo object or returns null.
 * @example digitalData.page.pageInfo.pageType
 * @function
 * @returns {String|null}
 */
const getPageType = () => getPageInfoObject() && getPageInfoObject().pageType
  ? getPageInfoObject().pageType : null;

/**
 * Returns the pageName from the pageInfo object or returns null.
 * @example digitalData.page.pageInfo.pageName
 * @function
 * @returns {String|null}
 */
const getPageName = () => getPageInfoObject() && getPageInfoObject().pageName
  ? getPageInfoObject().pageName : null;

/**
 * Returns the if we should display the email pop or not.
 * @example digitalData.page.pageInfo.enableEmailPopup
 * @function
 * @returns {Boolean}
 */
const getEnableEmailPopup = () => getPageInfoObject() && getPageInfoObject()
  .enableEmailPopup
  ? getPageInfoObject().enableEmailPopup : false;

/**
 * Returns the onsiteSearchTerm from the pageInfo object or returns null.
 * @example digitalData.page.pageInfo.onsiteSearchTerm
 * @function
 * @returns {String|null}
 */
const getOnsiteSearchTerm = () => getPageInfoObject() && getPageInfoObject()
  .onsiteSearchTerm
  ? getPageInfoObject().onsiteSearchTerm : null;

/**
 * Returns the onsiteSearchResults from the pageInfo object or returns
 * null.
 * @example digitalData.page.pageInfo.onsiteSearchResults
 * @function
 * @returns {Number|null}
 */
const getOnsiteSearchResults = () => getPageInfoObject() && getPageInfoObject()
  .onsiteSearchResults
  ? getPageInfoObject().onsiteSearchResults : null;

/**
 * Returns the page primaryCategory from the category object or returns
 * null.
 * @example digitalData.page.category.primaryCategory
 * @function
 * @returns {String|null}
 */
const getPrimaryCategory = () => getCategoryObject() && getCategoryObject()
  .primaryCategory
  ? getCategoryObject().primaryCategory : null;

/**
 * Returns the page subCategory1 from the category object or returns null.
 * @example digitalData.page.category.subCategory1
 * @function
 * @returns {String|null}
 */
const getSubCategory1 = () => getCategoryObject() && getCategoryObject()
  .subCategory1
  ? getCategoryObject().subCategory1 : null;

/**
 * Returns an array of profileID from the profileInfo object or returns
 * an empty array.
 * @example digitalData.user[i].profile[i].profileInfo.profileID
 * @function
 * @returns {String[]|Array}
 */
const getProfileID = () => getProfileInfoArray()
  .map(profile => profile.profileID ? profile.profileID : []);

/**
 * Returns an array of productID from the productInfo object or returns
 * an empty array.
 * @example digitalData.product[i].productInfo.productID
 * @function
 * @returns {String[]|Array}
 */
const getProductID = () => getProductInfoArray()
  .map(product => product.productID ? product.productID : []);

/**
 * Returns an array of masterSku from the productInfo object or returns
 * an empty array.
 * @example digitalData.product[i].productID.masterSku
 * @function
 * @returns {String[]|Array}
 */
const getMasterSku = () => getProductInfoArray()
  .map(product => product.masterSku ? product.masterSku : []);

/**
 * Returns an array of productName from the productInfo object or returns
 * an empty array.
 * @example digitalData.product[i].productInfo.productName
 * @function
 * @returns {String[]|Array}
 */
const getProductName = () => getProductInfoArray()
  .map(product => product.productName ? product.productName : []);

/**
 * Returns an array of description from the productInfo object or returns
 * an empty array.
 * @example digitalData.product[i].productInfo.description
 * @function
 * @returns {String[]|null}
 */
const getDescription = () => getProductInfoArray()
  .map(product => product.description ? product.description : null);

/**
 * Returns an array of brand from the productInfo object or returns an
 * empty array.
 * @example digitalData.product[i].productInfo.brand
 * @function
 * @returns {String[]|Array}
 */
const getBrand = () => getProductInfoArray()
  .map(product => product.brand ? product.brand : []);

/**
 * Returns an array of onSale from the productInfo object or returns an
 * empty array.
 * @example digitalData.product[i].productInfo.onSale
 * @function
 * @returns {Boolean[]}
 */
const getOnSale = () => getProductInfoArray()
  .map(product => product.onSale ? product.onSale : false);

/**
 * Returns an array of product rating from the productInfo object or
 * returns an empty array.
 * @example digitalData.product[i].productInfo.rating
 * @function
 * @returns {String[]|Array}
 */
const getRating = () => getProductInfoArray()
  .map(product => product.rating ? product.rating : null);

/**
 * Returns an array of ratingCount from the productInfo object or returns
 * an empty array.
 * @example digitalData.product[i].productInfo.ratingCount
 * @function
 * @returns {String[]|Array}
 */
const getRatingCount = () => getProductInfoArray()
  .map(product => product.ratingCount ? product.ratingCount : []);

/**
 * Returns an array of product cost including tax from the price object or
 * returns an empty array.
 * @example digitalData.product[i].price.currentPrice
 * @function
 * @returns {Number[]|Array}
 */
const getCurrentPrice = () => getPriceArray()
  .map(product => product.currentPrice ? product.currentPrice : []);

/**
 * Returns an boolean value base on if the cart has an gift wrap item
 * within it.
 * @example digitalData.cart.attributes.giftWrap
 * @function
 * @returns {Boolean}
 */
const getGiftWrap = () => getCartAttributesObject() && getCartAttributesObject()
  .giftWrap
  ? getCartAttributesObject().giftWrap === 'yes' : false;

/**
 * Returns an boolean value base on if the cart has an engraving item
 * within it.
 * @example digitalData.cart.attributes.engraving
 * @function
 * @returns {Boolean}
 */
const getEngraving = () => getCartAttributesObject() &&
getCartAttributesObject().engraving
  ? getCartAttributesObject().engraving === 'yes' : false;

/**
 * Returns the basketTotal from the attributes object or returns null.
 * @example digitalData.cart.attributes.basketTotal
 * @function
 * @returns {Number|null}
 */
const getBasketTotal = () => getCartAttributesObject() &&
getCartAttributesObject().basketTotal
  ? getCartAttributesObject().basketTotal : null;

/**
 * Returns an array of all the productID's from productInfo or returns an
 * empty array.
 * @example digitalData.cart.item[i].productInfo.productID
 * @function
 * @returns {String[]|Array}
 */
const getCartProductID = () => getCartProductInfoArray()
  .map(cartItem => cartItem.productID ? cartItem.productID : []);

/**
 * Returns an array of all the masterSku from the productInfo object or
 * returns a null value. This can happen
 * if it's a gift wrap option
 * @example digitalData.cart[i]item.productInfo.masterSku
 * @function
 * @returns {String[]|null}
 */
const getCartMasterSku = () => getCartProductInfoArray()
  .map(cartItem => cartItem.masterSku ? cartItem.masterSku : null);

/**
 * Returns an array of all the productNames from the productInfo object
 * or returns an empty array.
 * @example digitalData.cart.item[i].productInfo.productName
 * @function
 * @returns {String[]|Array}
 */
const getCartProductName = () => getCartProductInfoArray()
  .map(cartItem => cartItem.productName ? cartItem.productName : []);

/**
 * Returns an array of all the description from the productInfo object or
 * returns a null value. This can happen
 * if it's a gift wrap option
 * @example digitalData.cart.item[i].productInfo.description
 * @function
 * @returns {String[]|Array}
 */
const getCartDescription = () => getCartProductInfoArray()
  .map(cartItem => cartItem.description ? cartItem.description : null);

/**
 * Returns an array of all the brands from the productInfo object or
 * returns a null value. This can happen
 * if it's a gift wrap option
 * @example digitalData.cart.item[i].productInfo.brand
 * @function
 * @returns {String[]|Array}
 */
const getCartBrand = () => getCartProductInfoArray()
  .map(cartItem => cartItem.brand ? cartItem.brand : null);

/**
 * Returns an array of onSale from the productInfo object or returns an
 * empty array.
 * @example digitalData.cart.item[i].productInfo.onSale
 * @function
 * @returns {String[]|Array}
 */
const getCartOnSale = () => getCartProductInfoArray()
  .map(cartItem => cartItem.onSale ? cartItem.onSale : false);

/**
 * Returns an array of the rating from the productInfo object or returns
 * an empty array.
 * @example digitalData.cart.item[i].productInfo.rating
 * @function
 * @returns {String[]|null}
 */
const getCartRating = () => getCartProductInfoArray()
  .map(cartItem => cartItem.rating ? cartItem.rating : null);

/**
 * Returns an array of the ratingCount from the productINfo object or
 * returns an empty array.
 * @example digitalData.cart.item[i].productInfo.ratingCount
 * @function
 * @returns {String[]|null}
 */
const getCartRatingCount = () => getCartProductInfoArray()
  .map(cartItem => cartItem.ratingCount ? cartItem.ratingCount : null);

/**
 * Returns an array of estimatedDelivery dates from the productInfo object
 * or returns a null value.
 * @example digitalData.cart.item[i].productInfo.estimatedDelivery
 * @function
 * @returns {String[]|null}
 */
const getCartEstimatedDelivery = () => getCartProductInfoArray()
  .map(cartItem => cartItem.estimatedDelivery ? cartItem.estimatedDelivery
    : null);

/**
 * Returns an array of the PrimaryCategory from the productInfo object or
 * returns an empty array.
 * @example digitalData.cart.item[i].category.primaryCategory
 * @function
 * @returns {(String|null)[]}
 */
const getCartPrimaryCategory = () => getCartCategoryArray()
  .map(cartItem =>
    cartItem.primaryCategory ? cartItem.primaryCategory : null);

/**
 * Returns an array of the subCategory from the productInfo object or
 * returns a a null value.
 * @example digitalData.cart.item[i].category.subCategory1
 * @function
 * @returns {(String|null)[]}
 */
const getCartSubCategory1 = () => getCartCategoryArray()
  .map(cartItem => cartItem.subCategory1 ? cartItem.subCategory1 : null);

/**
 * Returns an array of product prices including tax from the price object
 * or returns an empty array.
 * @example digitalData.cart.item[i].price.basePrice
 * @function
 * @returns {(Number|null)[]}
 */
const getCartBasePrice = () => getCartPriceArray()
  .map(cartItem => cartItem.basePrice ? cartItem.basePrice : null);

/**
 * Returns an array of the tax rate of each product from the price object
 * or returns an empty array.
 * @example digitalData.cart.item[i].price.taxRate
 * @function
 * @returns {(Number|null)[]}
 */
const getCartTaxRate = () => getCartPriceArray()
  .map(cartItem => cartItem.taxRate ? cartItem.taxRate : null);

export {

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getPageInstanceID
   */
  getPageInstanceID,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getPageType
   */
  getPageType,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getPageName
   */
  getPageName,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getEnableEmailPopup
   */
  getEnableEmailPopup,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getOnsiteSearchTerm
   */
  getOnsiteSearchTerm,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getOnsiteSearchResults
   */
  getOnsiteSearchResults,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getPrimaryCategory
   */
  getPrimaryCategory,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getSubCategory1
   */
  getSubCategory1,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getProfileID
   */
  getProfileID,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getProductID
   */
  getProductID,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getMasterSku
   */
  getMasterSku,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getProductName
   */
  getProductName,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getDescription
   */
  getDescription,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getBrand
   */
  getBrand,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getOnSale
   */
  getOnSale,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getRating
   */
  getRating,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getRatingCount
   */
  getRatingCount,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCurrentPrice
   */
  getCurrentPrice,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getGiftWrap
   */
  getGiftWrap,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getEngraving
   */
  getEngraving,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getBasketTotal
   */
  getBasketTotal,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartProductID
   */
  getCartProductID,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartMasterSku
   */
  getCartMasterSku,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartProductName
   */
  getCartProductName,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartDescription
   */
  getCartDescription,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartBrand
   */
  getCartBrand,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartOnSale
   */
  getCartOnSale,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartRating
   */
  getCartRating,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartRatingCount
   */
  getCartRatingCount,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartEstimatedDelivery
   */
  getCartEstimatedDelivery,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartPrimaryCategory
   */
  getCartPrimaryCategory,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartSubCategory1
   */
  getCartSubCategory1,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartBasePrice
   */
  getCartBasePrice,

  /**
   * @memberOf module:getDigitalDataMethods
   * @see module:getDigitalDataMethods~getCartTaxRate
   */
  getCartTaxRate
};
