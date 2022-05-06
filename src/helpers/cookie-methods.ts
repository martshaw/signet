
/**
 * Creates a cookie with the name and vales passed in
 *
 * @param name - Name for the cookie
 * @param value - The value of the cookie
 * @param expires - Set the date at with the cookie will expire
 */
export const createCookie = (name: string, expires: Date, value = '') => {
  const hostName = location.hostname;
  const cookieValue = encodeURIComponent(value);

  const cookie =
    `${name}=${cookieValue};expires=${expires.toUTCString()};path=/;`;

  document.cookie = `${cookie};sameSite=strict;secure=true;domain=${hostName};`;
};

/**
 * Delete the name cookie
 *
 * @param name - The name of the cookie to delete.
 */
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

/**
 * Find a cookie base on the name passed in.
 *
 * @param name - Name of the cookie to find
 * @returns The index of the cookie or -1 if not found
 */
export const findCookie = (name: string): boolean =>
  RegExp(name).test(document.cookie);

/**
 * Reads the contents of the a cookie
 *
 * @param name - Name of the cookie you wish read
 */
export const readCookies = (name: string): string[] | null => {
  if (findCookie(name)) {
    const cookiesArray = document.cookie.split(';');
    const cookieValue: string[] = [];

    if (cookiesArray) {
      cookiesArray.forEach(cookie => {
        const cookieData = cookie.split('=');

        if (name.trim() === cookieData[0].trim()) {
          cookieValue.push((cookieData.slice(1).join('=')));
        }
      });
    }

    return cookieValue;
  }

  return null;
};

/**
 * Check the cookie bot cookie to see if the customer has given consent for
 * us to use statics.
 *
 * @return {boolean}
 */
export const isStatisticsEnabled = () => {
  return readCookies('CookieConsent')
    ?.some(cookie => cookie.includes('statistics:true'));
};
