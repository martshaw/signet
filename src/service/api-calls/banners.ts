import { axios } from '@/service/axios/configuration';
import { errorHandling } from '@/helpers/errorHandling';

export type Banner = {
  metaText?: {
    title?: string
    h1?: string
    description?: string
  }
  plpBanner?: {
    imageURL: string
    mobileImageURL: string
    imageAltText: string
    linkURL: string
    heading: string
    text: string
    callToAction: string
    textColour: string
    ctaFillColour: string
    showReadMore: string
    readMoreText: string
    ctaTextColour: string
    ctaPosition: string
  }
  seoText?: {
    h2: string
    intro: string
    body: string
  },
  quickLinks?: [
    {
      imageUrl: string
      imageUrls: string[]
      altText: string
      title: string
      actionLink: string
    }
  ],
  errorMsg?: string
}

export const getListBanners = async (url: string) =>
  axios.get<Banner|Error>(`/webstore/getPLPBanner/?url=${url.toLowerCase()}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error((errorHandling(error.response.status)));
    });
