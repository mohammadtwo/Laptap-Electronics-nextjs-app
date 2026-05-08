// types/api.ts
export interface ApiOrdersResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipping"
  | "delivered"
  | "cancelled"
  | "confirmed";

export type PaymentMethod = "online" | "cash";

export interface Order {
  _id: string;
  user: User;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  status: OrderStatus;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
}

export interface OrderItem {
  _id: string;
  product: Product;
  name: string;
  quantity: number;
  price: number;
  image: string;
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
export interface Order {
  _id: string;
  user: User;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: "online" | "cash";
  totalPrice: number;
  status: OrderStatus;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
}

export interface OrderItem {
  _id: string;
  product: Product;
  name: string;
  quantity: number;
  price: number;
  image: string;
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
}
