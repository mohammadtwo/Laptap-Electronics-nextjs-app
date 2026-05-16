export type GetProductsParams = {
  search?: string;
  category?: string;
  brand?: string;
  id?: string;
  limit?: string;
  page?: string;
};
export type Param = {
  category?: string;
  brand?: string;
  search?: string;
  page?: string;
};
export interface Props {
  title: string;
  href: string;
  image: string;
}
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