export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  priceFormatted: string;
}

export interface ApiProduct {
  productId: string;
  displayName: string;
  mediaUrls: string[];
  prices: Price[];
}

export interface Price {
  label: string;
  type: string;
  symbol: string;
  price: string;
  unit: string;
  priceWithoutFormatting: number;
}