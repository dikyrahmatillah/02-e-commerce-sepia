export type ProductDetail = {
  id: string;
  name: string;
  category: string;
  brand: string;
  tags: string[];
  sku: string;
  rating: number;
  reviews: Array<{
    id: number | string;
    author: string;
    rating: number;
    content: string;
    images?: string[];
  }>;
  price: string;
  oldPrice?: string;
  badge?: string;
  shortDescription: string;
  imageSrc: string;
  gallery: string[];
  description: string;
  features: string[];
  additionalInfo: Array<{ label: string; value: string }>;
};

export type RelatedProduct = {
  id: string;
  name: string;
  price?: string;
  oldPrice?: string;
  badge?: string;
  imageSrc?: string;
};

export const PRODUCT_ENDPOINT = "/api/products/details";
