export interface Product {
  id:                   number;
  title:                string;
  description:          string;
  slug:                 string;
  price:                number;
  material:             string;
  currentPrice:         number;
  discountPercentage:   number;
  discountUntil:        Date;
  color:               string;
  quantity:             number;
  imageUrls:            string[];
  createdAt:            Date;
  collectionId:         number;
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
