/* eslint-disable camelcase */

type EventReset = { ecommerce: null }

interface BaseProductItem {
  item_id: string
  item_name: string
  currency: 'GBP'
  discount: number
  index: number
  item_brand: string
  item_category: string
  item_category2?: string
  item_category3?: string
  item_list_id: 'plp' | 'slp' | 'recs'
  item_list_name: string
  price: number
  quantity: number
}

type ListProductItemOmit = 'discount' | 'quantity'
export interface ListProductItem extends
  Omit<BaseProductItem, ListProductItemOmit > {
  item_list_id: 'plp' | 'recs' | 'syte'
}

type ViewProductItemOmit = 'discount' | 'index' | 'item_list_id' |
  'item_list_name' | 'quantity'
interface ViewProductItem extends
  Omit<BaseProductItem, ViewProductItemOmit>{
  item_variant?: string
}

type AddToCartProductItemOmit = 'discount' | 'index' | 'item_list_id' |
  'item_list_name'
interface AddToCartProductItem extends
  Omit<BaseProductItem, AddToCartProductItemOmit>{
  item_variant?: string
}

type ViewCartProductItemOmit = 'index'| 'item_list_id' | 'item_list_name'
interface ViewCartProductItem extends
  Omit<BaseProductItem, ViewCartProductItemOmit> {
  item_variant?: string
  coupon?: string
}

type ViewItemList = {
  event: 'view_item_list' | 'select_item'
  ecommerce: {
    items: ListProductItem[]
  }
}

type ViewItem = {
  event: 'view_item'
  ecommerce: {
    items: ViewProductItem[]
  }
}

type AddToCart = {
  event: 'add_to_cart'| 'remove_from_cart' | 'begin_checkout'
  ecommerce: {
    items: AddToCartProductItem[]
  }
}

type ViewCart = {
  event: 'view_cart' | 'add_shipping_info'
  ecommerce: {
    currency: 'GBP'
    value: number
    coupon?: string
    items: ViewCartProductItem[]
  }
}

type Purchase = {
  event: 'purchase'
  ecommerce: {
    transaction_id: string
    value: number
    tax: number
    shipping?: number
    currency: 'GBP'
    coupon?: string
    items: ViewCartProductItem[]
  }
}

export type Events = ViewItemList | EventReset | ViewItem | AddToCart | ViewCart
  | Purchase

export type DataLayer = {
  push: (eventType: Events | {[key: string]: any}) => void
}
