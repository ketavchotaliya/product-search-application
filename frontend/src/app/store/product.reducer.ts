import { createReducer, on } from '@ngrx/store';
import { ProductState } from './app.state';
import * as ProductActions from './product.actions';

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  searchTerm: '',
};

export const productReducer = createReducer(
  initialState,

  // Search the products
  on(ProductActions.searchProducts, (state, { searchTerm }) => ({
    ...state,
    loading: true,
    error: null,
    searchTerm: searchTerm.trim(),
  })),

  // On search success
  on(
    ProductActions.searchProductsSuccess,
    (state, { products, searchTerm }) => ({
      ...state,
      products,
      loading: false,
      error: null,
      searchTerm,
    })
  ),

  // On search Failed
  on(ProductActions.searchProductsFailure, (state, { error }) => ({
    ...state,
    products: [],
    loading: false,
    error,
  })),

  // Clear Products
  on(ProductActions.clearProducts, (state) => ({
    ...state,
    loading: false,
    products: [],
    error: null,
    searchTerm: '',
  })),

  // Set loading
  on(ProductActions.setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),

  // Clear Error
  on(ProductActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
