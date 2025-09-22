import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry, tap } from 'rxjs/operators';

import {
  ProductSearchResponse,
  Product,
  ApiResponse,
} from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  /**
   * Search a Products by name
   * @Param searchTerm - the search keyword to filter the products
   * @return Observable of the product array
   */
  searchProducts(searchTerm: string): Observable<Product[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      return new Observable((subscriber) => {
        subscriber.next([]);
        subscriber.complete();
      });
    }

    const params = new HttpParams().set('search', searchTerm.trim());

    return this.http
      .get<ApiResponse<ProductSearchResponse>>(`${this.apiBaseUrl}/products`, {
        params,
      })
      .pipe(
        tap((response) => {
          // Debug the API response in raw format
          console.log('RAW API Response: ', response);
        }),
        map((response) => {
          let products: Product[] = [];
          if (response?.data && Array.isArray(response.data.products)) {
            products = response.data.products;
          }

          console.log('Mapped products: ', products);
          return products;
        }),
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Handle http errors
   * @Params error - Http error object / response
   * @return Observable error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error code: ${error.status} \n Error Message: ${error.message}`;

      // Handle specific error scenario
      switch (error.status) {
        case 0:
          errorMessage =
            'Unable to connect to the server. Please check if there is Server is running.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
      }
    }

    console.error(
      `Error at ProductService while calling API: Error --> ${errorMessage}`
    );
    return throwError(() => new Error(errorMessage));
  }
}
