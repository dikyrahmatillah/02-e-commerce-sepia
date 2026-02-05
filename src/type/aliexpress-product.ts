export interface ApiResponse<T> {
  data: {
    productId: string;
    data: T;
  };
}

export interface AliProduct {
  id: number;
  rating: number;
  reviews: Review[];
  storeId: number;
  videoId?: number;
  webUrl?: string;
  posterUrl?: string;
  keywords: string[];
  sellerId: number;
  pcDescUrl: string;
  salePrice?: number;
  shortDesc: string;
  totalSold?: number;
  categories: Category[];
  sellerInfo?: SellerInfo;
  maxBuyCount?: number;
  showedProps: ShowedProp[];
  productTitle: string;
  imagePathList: string[];
  nativeDescUrl?: string;
  originalPrice: number;
  relatedSearch?: string[];
  reviewSummary?: ReviewSummary;
  skuProperties: SkuProperty[];
  totalValidNum?: number;
  wishItemCount?: number;
  discountPercentage?: string;
  totalAvailableInventory?: number;
}

export interface Review {
  id: number;
  author: string;
  images: string[];
  rating: number;
  content: string;
  skuInfo?: string;
  createTime?: string;
}

export interface Category {
  name: string;
  cateId: number;
}

export interface SellerInfo {
  province: string;
  storeNum: number;
  storeURL: string;
  storeName: string;
  openedYear: number;
  sellerScore: number;
  storeRating: number;
  formatOpenTime: string;
  sellerTotalNum: number;
  storeWishedCount: number;
  sellerPositiveNum: number;
  sellerPositiveRate: number;
  countryCompleteName: string;
}

export interface ShowedProp {
  attrName: string;
  attrValue: string;
}

export interface ReviewSummary {
  oneStarNum: number;
  twoStarNum: number;
  threeStarNum: number;
  fourStarNum: number;
  fiveStarNum: number;
  oneStarRate: number;
  twoStarRate: number;
  threeStarRate: number;
  fourStarRate: number;
  fiveStarRate: number;
}

export interface SkuProperty {
  skuPropertyId: number;
  skuPropertyName: string;
  skuPropertyValues: SkuPropertyValue[];
}

export interface SkuPropertyValue {
  propertyValueName: string;
  propertyValueIdLong: number;
  skuPropertyImagePath?: string;
  propertyValueDisplayName?: string;
}

export type AliProductApiResponse = ApiResponse<AliProduct>;
