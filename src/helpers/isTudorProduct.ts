/* eslint-disable max-len, vue/max-len */
// @ts-ignore
import type { LineItemBaseClass } from '@/service/LineItemClasses/LineItemBaseClass';
/* eslint-enable max-len, vue/max-len */

export const isTudorProduct = (productData: LineItemBaseClass) =>
  productData.brand?.lvl0.startsWith('Tudor');
