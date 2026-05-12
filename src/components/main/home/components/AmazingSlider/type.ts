export interface ApiResponse<T> {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: T[];
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  brand: string;
  rating: number;
  numReviews: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ProductsResponse = ApiResponse<Product>;
