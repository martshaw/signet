/* eslint-disable max-len, vue/max-len */
import { InGridBanners } from '@/@types/in-grid-banners';
/* eslint-enable */

export type AlgoliaRefinement = {
  attribute: string
  count: number
  exhaustive: boolean
  label: string
  type: string
  value: string | number
  operator?: string
  refine?: (refinement: AlgoliaRefinement) => void
}

export type AlgoliaCurrentRefinement = {
  attribute: string
  indexName: string
  label: string
  refinements: AlgoliaRefinement[]
  refine: (refinement: AlgoliaRefinement) => void
}

export type AlgoliaUserData = {
  facetPositions: {}[]
  // eslint-disable-next-line camelcase
  quick_view_enabled: boolean
}

/* eslint-disable camelcase */
export type AlgoliaProduct = {
  available_to_buy: 'both' | 'web' | 'store' // This is only a guess
  short_name: string
  parent_sku: string
  sku_id: number
  new_calc: boolean
  current_price: number
  price_history_2?: string
  ifc_credit_min_repayment?: number
  paypal_credit_min_repayment?: number
  on_sale_calc: boolean
  product_detail_url: string
  collection: string
  limit_collection_to_boutique_stores: string
  avg_overall_rating: number
  total_review_count: number
  product_usp: string[] | null
  brand?: {
    lvl0: string
    lvl1: string | null
    lvl2: string | null
  }
  merchandising_1_ej: string
  merchandising_2_ej: string
  merchandising_3_ej: string
  merchandising_4_ej: string
  merchandising_5_ej: string
  merchandising_6_ej: string
  merchandising_7_ej: string
  orderable_on_website: boolean
}
/* eslint-enable camelcase */

type Signet = {
  VUE_APP_ALGOLIA_APP_ID?: string,
  VUE_APP_ALGOLIA_APP_KEY?: string,
  VUE_APP_ALGOLIA_SEARCH_INDEX_PRODUCTS?: string
  VUE_APP_ALGOLIA_TOP_RATED_INDEX_PRODUCTS?: string
  VUE_APP_ALGOLIA_PRICE_DESC_INDEX_PRODUCTS?: string
  VUE_APP_ALGOLIA_PRICE_ASC_INDEX_PRODUCTS?: string
  VUE_APP_ALGOLIA_NEW_ARRIVAL_INDEX_PRODUCTS?: string
  InGridBanner?: InGridBanners[];
}

declare global {
  interface Window {
    Signet: Signet
    dataLayer?: object[]
    digitalData?: DigitalData
  }

  namespace NodeJS {
    interface ProcessEnv {
      VUE_APP_CHECKOUT_DELIVERY_URL: string
      VUE_APP_AXIOS_TIMEOUT: 5000 | 1000
    }
  }
}

export type digitalData = DigitalData;

export type LineItems = {
  sku?: number,
  masterSku?: number,
  name?: string,
  description?: string,
  price?: number,
  wasPrice?: number,
  previousPrice?: number,
  savingPrice?: number,
  deliveryDate?: number,
  deliveryDateMilliSeconds?: number,
  imageUrl?: string,
  imageSrc?: string,
  productUrl?: string,
  editUrl?: string,
  stockMessage?: string
  offer?: string
  isTudorProduct?: boolean
  sizeSelected?: string,
  offerMessage?: string,
  category: string,
  personalisedId?: string,
  warrantyDetails: {
    basketItemDbIndex?: number
    masterSku?: string,
    length?: number,
    value?: number,
    warrantySku?: string
  }
}
