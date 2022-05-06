/**
 * @file
 */

/**
 * @module cookieMethods
 */

/**
 * Create's a cookie with the name and vales passed in
 * @function
 * @param {String} name - Name for the cookie
 * @param {String} value - The value of the cookie
 * @param {Date} [expires] - Set the date at with the cookie will expire
 * @throws Error - If the cookie has no name
 */
const createCookie = (name, value = '', expires = new Date()) => {
  const hostName = location.hostname;
  const cookieValue = encodeURIComponent(value);

  if (typeof name === 'undefined') {
    throw Error('The cookie needs a name');
  }

  if (!(expires instanceof Date)) {
    expires = new Date(expires);
  }

  const cookie =
  `${name}=${cookieValue};expires=${expires.toUTCString()};path=/;`;

  if (hostName.includes('localhost')) {
    document.cookie = cookie;
  } else {
    document.cookie =
      `${cookie};samesite=strict;secure=true;domain=${hostName};`;
  }
};

/**
       * Delete the name cookie
       * @function
       * @param {String} name - The name of the cookie to delete.
       */
const deleteCookie = name => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

/**
       * Find a cookie base on the name passed in.
       * @function
       * @param {String} name - Name of the cookie to find
       * @returns {Boolean} - The index of the cookie or -1 if not found
       */
const findCookie = name => {
  if (RegExp.unicode) {
    return RegExp(name, 'u').test(document.cookie);
  }

  // eslint-disable-next-line require-unicode-regexp
  return RegExp(name).test(document.cookie);
};

/**
 * Reads the full content of the cookies with matching name
 * @function
 * @param {String} name - Name of the cookie you wish read
 * @returns {Array} - Array of cookies
 */
const readCookies = name => {
  const cookiesArray = document.cookie.split(';');
  const cookieValue = [];

  if (cookiesArray) {
    cookiesArray.forEach(cookie => {
      const cookieData = cookie.split('=');

      if (name.trim() === cookieData[0].trim()) {
        cookieValue.push((cookieData.slice(1).join('=')));
      }
    });
  }

  return cookieValue;
};

/**
 * Check the cookie bot cookie to see if the customer has given consent for
 * us to use statics.
 *
 * @return {boolean}
 */
const isStatisticsEnabled = () => {
  return readCookies('CookieConsent')
    .some(cookie => cookie.includes('statistics:true'));
};

export {

  /**
   * @memberOf module:cookieMethods
   * @see module:cookieMethods~createCookie
   */
  createCookie,

  /**
   * @memberOf module:cookieMethods
   * @see module:cookieMethods~deleteCookie
   */
  deleteCookie,

  /**
   * @memberOf module:cookieMethods
   * @see module:cookieMethods~findCookie
   */
  findCookie,

  /**
   * @memberOf module:cookieMethods
   * @see module:cookieMethods~readCookies
   */
  readCookies,

  /**
   * @memberOf module:cookieMethods
   * @see module:cookieMethods~isStatisticsEnabled
   */
  isStatisticsEnabled
};
