import type { AlgoliaProduct } from '@/@types/types';

const transformIntoPrice = (value: number): string =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(value);

export default class LineItemBaseClass {
  /**
   * What the name of the product is.
   *
   * @private
   */
  #name!: string;

  /**
   * The current price of the product set as two decimal place and with pound
   * symbol
   *
   * @private
   */
  #price!: string;

  /**
   * The current price of the product as a number
   *
   * @private
   */
  #priceAsNumber = 0;

  /**
   * The price history of the product
   *
   * @private
   */
  #priceHistory: string[] | undefined;

  /**
   * The per month price
   *
   * @private
   */
  #installment!: string | null;

  /**
   * The product URl to the detail page
   *
   * @private
   */
  #url!: string;

  /**
   * The sku of the parent of this product, If this is the parent product then
   * this is it's sku
   *
   * @private
   */
  #parentSku!: string;

  /**
   * These products sku. This is different from the parent as this product could
   * be a child of the parent and then will have its own sku.
   *
   * @private
   */
  #productSku!: number;

  /**
   * Property to determine if the product is one of our third party
   * personalised products or not.
   */
  personalisedId = false;

  /**
   * Is the item on sale (true)
   * or not (false).
   *
   * @private
   * @readonly
   */
  readonly #isOnSale: boolean;

  /**
   * Get the brand of the product
   *
   * @private
   * @readonly
   */
  readonly brand: AlgoliaProduct['brand'];

  constructor (lineItemObject: AlgoliaProduct) {
    this.name = lineItemObject.short_name;
    this.parentSku = lineItemObject.parent_sku;
    this.productSku = lineItemObject.sku_id;
    // @ts-ignore
    this.price = lineItemObject.current_price;
    this.#isOnSale = lineItemObject.on_sale_calc;
    this.url = lineItemObject.product_detail_url;
    this.brand = lineItemObject.brand;
    // @ts-ignore
    this.priceHistory = lineItemObject.price_history_2;
    // @ts-ignore
    this.installment = {
      ifc: lineItemObject.ifc_credit_min_repayment,
      paypal: lineItemObject.paypal_credit_min_repayment
    };
  }

  /**
   * Get the product name from the class and returns it
   */
  get name (): string {
    return this.#name;
  }

  /**
   * Set the name of the product
   */
  set name (value: string) {
    this.#name = value;
  }

  /**
   * Get the parent Sku
   */
  get parentSku (): string {
    return this.#parentSku;
  }

  /**
   * Checks if the parent Sku is a number
   */
  set parentSku (sku: string) {
    this.#parentSku = sku;
  }

  /**
   * This product SKU number
   */
  get productSku (): number {
    return this.#productSku;
  }

  /**
   * Assign the property to the private property.
   */
  set productSku (sku: number) {
    this.#productSku = sku;
  }

  /**
   * Constructors the product image url from a known AWS bucket domain and
   * product master sku.
   */
  get image (): URL {
    const domain = 'https://d34qiagx43sg99.cloudfront.net/';
    return new URL(domain + this.parentSku);
  }

  /**
   * Get the current price of the product with symbol
   */
  // @ts-ignore
  get price (): string {
    return this.#price;
  }

  /**
   * Get the current price of the product as a number
   */
  get priceAsNumber (): number {
    return parseInt(this.#price.replace('£', ''));
  }

  /**
   * Set the current price of the product. It will convert the price in to a
   * string with two decimal points and the pound symbol
   */
  // @ts-ignore
  set price (price: number) {
    this.#price = transformIntoPrice(price);
    this.#priceAsNumber = parseInt(price.toFixed(2), 10);
  }

  /**
   * Get the price history of the product
   */
  // @ts-ignore
  get priceHistory (): string[] | undefined {
    return this.#priceHistory;
  }

  /**
   * Creates an array of prices that the product was. These prices will be in
   * string format
   *
   * @example `"£500.00, 250.00"`
   */
  // @ts-ignore
  set priceHistory (prices: string | undefined) {
    if (typeof prices === 'string') {
      this.#priceHistory = prices.split(',').map((price) =>
        price.trim());
    }
  }

  /**
   * Gets the per month cost of the product if it's eligible for finance.
   *
   * @return The price per month with the correct format or
   * null if the price is zero
   */
  // @ts-ignore
  get installment (): string | null {
    if (this.#installment === '£0.00') {
      return null;
    }

    return this.#installment;
  }

  /**
   * Sets the price per month as a sting and correctly formatted
   */
  // @ts-ignore
  set installment (price: {ifc: number, paypal: number}) {
    let { ifc, paypal } = price;
    let cheapestPrice;

    // If the value is 0 reset it to `Infinity`
    if (ifc === 0) {
      ifc = Infinity;
    }

    if (paypal === 0) {
      paypal = Infinity;
    }

    if (ifc !== Infinity && paypal !== Infinity) {
      cheapestPrice = ifc < paypal ? ifc : paypal;
    } else {
      cheapestPrice = 0;
    }

    if (ifc === Infinity && paypal !== Infinity) {
      cheapestPrice = paypal;
    }

    if (paypal === Infinity && ifc !== Infinity) {
      cheapestPrice = ifc;
    }

    this.#installment = transformIntoPrice(cheapestPrice);
  }

  /**
   * Get the URL to the product detail page
   */
  get url (): string {
    return this.#url;
  }

  /**
   * Creates a URL to the Product detail page for the product
   */
  set url (stringURL: string) {
    this.#url = stringURL;
  }

  /**
   * Return if the product is on sale or not
   */
  get isOnSale (): boolean {
    return this.#isOnSale;
  }
}
