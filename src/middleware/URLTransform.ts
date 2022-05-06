import urls from '../../public/resources/seoUrls.json';

// Adding types to json file
const seoUrl : {[index: string]: string} = urls;

/* eslint-disable max-len, vue/max-len */
/**
 * A function to check if two arrays contain all the elements in each other
 * @arg The array to compare against
 * @arg The target array for comparison
 * @see {@link https://stackoverflow.com/questions/53606337/check-if-array-contains-all-elements-of-another-array|stackoverflow}
 */
const checker = (arr: any[], target: any[]) =>
  target.every((v: any[]) => arr.includes(v));
/* eslint-enable max-len, vue/max-len */

/**
 * Gets the facets from the SEO version of the url to create route state
 * from them.
 * @arg the current url of the page
 */
export const beautifyURLToRefinementURL = (url: Window['location']): string => {
  const { pathname, search } = url;

  for (const urlsKey in seoUrl) {
    let seoKey = seoUrl[urlsKey];
    let key = urlsKey;

    if (process.env.NODE_ENV === 'development') {
      key = urlsKey.replace('/webstore', '');
      seoKey = seoKey.replace('/webstore/l/', '');
    }

    if (key === pathname) {
      return search ? seoKey.concat('&', search.replace('?', '')) : seoKey;
    }
  }

  return url.search;
};

/**
 * Try to match the URL with a SEO/Beautify version
 * @arg The Algolia version of the URL we will use to match against
 */
export const refinementURLToBeautifyURL = (url: string): string => {
  // Split the URL to create an array.
  const frontEndURL = decodeURIComponent(url.toLowerCase())
    .replace('?', '')
    .split('&');

  // Loop through the JSON file looking for a match to the URL
  for (const urlsKey in seoUrl) {
    // Split the URL to create an array.
    const seoURL = decodeURIComponent(
      new URL(seoUrl[urlsKey], location.origin).search)
      .replace('?', '')
      .split('&');

    if (checker(frontEndURL, seoURL)) {
      const getRemainFacets = (arr: any[], target: any[]) => {
        return target.filter((item) => !arr.includes(item));
      };

      const constructedURL = () => {
        let baseUrl = urlsKey.replace('/webstore/l/', '');
        const remainFacets = getRemainFacets(seoURL, frontEndURL);

        if (remainFacets.length > 0) {
          baseUrl = baseUrl.concat('?', remainFacets.join('&'));
        }

        return baseUrl;
      };

      return constructedURL();
    }
  }

  return decodeURI(url);
};
