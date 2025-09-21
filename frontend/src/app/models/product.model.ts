export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export interface ProductSearchResponse {
  products: Product[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
