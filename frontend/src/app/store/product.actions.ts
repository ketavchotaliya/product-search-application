import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const searchProducts = createAction(
  '[Product] Search Products',
  props<{ searchTerm: string }>()
);

export const searchProductsSuccess = createAction(
  '[Product] Search Products Success',
  props<{ products: Product[]; searchTerm: string }>()
);

export const searchProductsFailure = createAction(
  '[Product] Search Products Failure',
  props<{ error: string }>()
);

export const clearProducts = createAction('[Product] Clear Products');

export const setLoading = createAction(
  '[Product] Set Loading',
  props<{ loading: boolean }>()
);

export const clearError = createAction('[Product] Clear Error');
