export interface Product {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  color: string;
  quantity: number;
  slug: string;
  price: number;
  discountUntil: string;
  currentPrice: number;
  discountPercentage: number;
  createdAt: string;
  imageUrls: string[];
  collectionId: number;
  collectionName: string;
}

export interface PaginatedProductsResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
