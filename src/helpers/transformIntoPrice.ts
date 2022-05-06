/**
 * Transform a number into a UK currency value adding the pound symbol and
 * formatting it to two decimal points
 */
export const transformIntoPrice = (value: number): string =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(value);
