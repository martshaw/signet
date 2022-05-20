// Types
import type { AlgoliaProduct } from '@/@types/types';

import LineItemBaseClass from '@/middleware/LineItemClasses/LineItemBaseClass';

/**
 * Class used to assign and format the properties of an Algolia product for
 * the list page.
 *
 * @extends LineItemBaseClass
 */
export default class LineItemListClass extends LineItemBaseClass {
  #ratings: string = '';
  #productUsps: AlgoliaProduct['product_usp'] = null;
  totalReviewers: AlgoliaProduct['total_review_count'];
  productPriceHistory: string | undefined;
  readonly merchandising1: string;
  readonly merchandising2: string;
  readonly merchandising3: string;
  readonly merchandising4: string;
  readonly merchandising5: string;
  readonly merchandising6: string;
  readonly merchandising7: string;
  readonly availableToBuy: string;
  readonly newCalc: boolean;
  readonly orderableOnWebsite: boolean;
  readonly categories: AlgoliaProduct['category']

  constructor (lineItemListObject: AlgoliaProduct) {
    super(lineItemListObject);

    this.totalReviewers = lineItemListObject.total_review_count;
    this._ratings(lineItemListObject.avg_overall_rating);
    this.merchandising1 = lineItemListObject.merchandising_1_ej;
    this.merchandising2 = lineItemListObject.merchandising_2_ej;
    this.merchandising3 = lineItemListObject.merchandising_3_ej;
    this.merchandising4 = lineItemListObject.merchandising_4_ej;
    this.merchandising5 = lineItemListObject.merchandising_5_ej;
    this.merchandising6 = lineItemListObject.merchandising_6_ej;
    this.merchandising7 = lineItemListObject.merchandising_7_ej;
    this.availableToBuy = lineItemListObject.available_to_buy;
    this.categories = lineItemListObject.category;
    this.newCalc = lineItemListObject.new_calc;
    this.priceHistory = lineItemListObject.price_history_2;
    this.orderableOnWebsite = lineItemListObject.orderable_on_website;
    this.usps = lineItemListObject.product_usp;
  }

  /**
   * Setting number of people that have left a review of he product.
   *
   * @private
   * @arg viewers - The total amount of people that have left a review for
   * this product
   */
  _ratings (ratings: AlgoliaProduct['total_review_count']) {
    /**
     * @see {@link https://codepoints.net/U+2605 Filled star}
     */
    const fullStar = '\u2605';

    /**
     * @see {@link https://codepoints.net/U+2606 Empty star}
     */
    const emptyStar = '\u2606';

    // The max amount of stars were allowed
    const totalAllowStar = 5;

    if (ratings > 0) {
      this.#ratings =
        fullStar.repeat(Math.floor(ratings)) +
        emptyStar.repeat(totalAllowStar - Math.floor(ratings));
    }
  }

  get ratings (): string {
    return this.#ratings;
  }

  /**
   * Get the top three product usp values
   *
   * @return {string[]} - Top three product usp values
   */
  get usps () {
    if (Array.isArray(this.#productUsps) && this.#productUsps.length > 3) {
      return this.#productUsps.slice(0, 3);
    }

    return this.#productUsps;
  }

  /**
   * Setting product usp values
   *
   * @private
   * @arg {string[] | null} productUsps - The unique selling points of the
   * product
   */
  set usps (productUsps: AlgoliaProduct['product_usp']) {
    if (Array.isArray(productUsps)) {
      productUsps.forEach(usps => {
        if (usps.length > 20) {
          productUsps.splice(productUsps.indexOf(usps), 1);
        }
      });

      this.#productUsps = productUsps;
    }
  }

  /**
   * Get the price history of the product
   *
   * @override
   * @return The price history of the product in string format
   */
  // @ts-ignore
  get priceHistory (): string | undefined {
    return this.productPriceHistory;
  }

  /**
   * Gets the first item in the price history array and set it to the property
   *
   * @private
   * @override
   */
  // @ts-ignore
  set priceHistory (prices) {
    if (typeof prices === 'string') {
      this.productPriceHistory = prices.split(',').map((price) =>
        price.trim())[0];
    }
  }
}
