
type PageInstanceID = string;

type Category = {
  primaryCategory: string
  subCategory1: string
}

type PageInfo = {
  geoRegion: 'GB'
  language: 'EN'
  pageType: 'PLP'
  server: string
}

type Page = {
  category: Category
  pageInfo: PageInfo
}

type UserLogout = [
  {
    profile: [
      {
        profileInfo: {
          profileID: 'loggedOut'
        }
      }
    ]
  }
]

declare type DigitalData = {
  page: Page
  pageInstanceID: PageInstanceID
  user: UserLogout
}
