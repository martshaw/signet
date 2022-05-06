export type State = {
  lowestPrice: number
  highestPrice: number
  displayType: 'grid' |'list' | 'column'
  showMobileRefinements: boolean,
  mainBanner: {
    imageURL: string | undefined
    mobileImageURL: string | undefined
    imageAltText: string
    linkURL: string | undefined
    heading: string | undefined
    callToAction: string | undefined
    ctaFillColour: string | undefined
    ctaTextColour: string | undefined
    ctaPosition: string | undefined
  },
  seoBanner: {
    title: string | undefined
    intro: string | undefined
    body: string | undefined
  }
}

const state = (): State => {
  return {
    lowestPrice: 0,
    highestPrice: 0,
    displayType: 'grid',
    showMobileRefinements: false,
    mainBanner: {
      imageURL: undefined,
      mobileImageURL: undefined,
      imageAltText: '',
      linkURL: undefined,
      heading: undefined,
      callToAction: undefined,
      ctaFillColour: undefined,
      ctaTextColour: undefined,
      ctaPosition: undefined
    },
    seoBanner: {
      title: undefined,
      intro: undefined,
      body: undefined
    }
  };
};

export default state;
