import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './app.state';

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectSearchTerm = createSelector(
  selectProductState,
  (state: ProductState) => state.searchTerm
);

export const selectProductCount = createSelector(
  selectProducts,
  (products) => products.length
);

export const selectHasProducts = createSelector(
  selectProducts,
  (products) => products.length > 0
);

export const selectIsSearching = createSelector(
  selectLoading,
  selectSearchTerm,
  (loading, searchTerm) => loading && searchTerm.length > 0
);

export const selectProductsWithLoading = createSelector(
  selectProducts,
  selectLoading,
  selectError,
  (products, loading, error) => ({
    products,
    loading,
    error,
  })
);

export const selectSearchState = createSelector(
  selectProducts,
  selectLoading,
  selectError,
  selectSearchTerm,
  (products, loading, error, searchTerm) => ({
    products,
    loading,
    error,
    searchTerm,
  })
);
