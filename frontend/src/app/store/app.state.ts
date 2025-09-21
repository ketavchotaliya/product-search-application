import { Product } from '../models/product.model';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

export interface AppState {
  products: ProductState;
}
