import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ProductService } from './services/product.service';
import { AppState } from './store';
import { Product } from './models/product.model';
import { selectSearchState } from './store';
import * as ProductActions from './store/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Product Search App';
  searchControl = new FormControl('');

  // Observable for search state
  searchState$ = this.store.select(selectSearchState);

  private destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store<AppState>,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    console.log('Component initialized.');
    this.setupSearch();
  }

  ngOnDestroy(): void {
    console.log('Component destroying.');
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // 300ms debounce
        distinctUntilChanged(),
        tap((searchTerm) => {
          const keyWord = searchTerm?.trim() || '';
          console.log('Search Term is: ', keyWord);

          if (!keyWord) {
            this.store.dispatch(ProductActions.clearProducts());
            return;
          }

          // dispatch search action
          this.store.dispatch(
            ProductActions.searchProducts({ searchTerm: keyWord })
          );
        }),
        switchMap((searchTerm) => {
          const keyWord = searchTerm?.trim() || '';

          if (!keyWord) {
            return [];
          }

          // Make the api call
          return this.productService.searchProducts(keyWord);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (products: Product[]) => {
          const searchTerm = this.searchControl.value?.trim() || '';
          console.log('Products received: ', products);
          this.store.dispatch(
            ProductActions.searchProductsSuccess({ products, searchTerm })
          );
        },
        error: (error) => {
          console.log('Error while searching products: ', error);
          this.store.dispatch(
            ProductActions.searchProductsFailure({
              error: error.message || 'Search Failed.',
            })
          );
        },
      });
  }

  trackByProductId(index: number, product: Product) {
    return product.id;
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.store.dispatch(ProductActions.clearProducts());
  }

  clearError(): void {
    this.store.dispatch(ProductActions.clearError());
  }

  searchFor(term: string): void {
    this.searchControl.setValue(term);
  }
}
