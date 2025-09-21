import { Injectable } from '@angular/core'; // ToDo explain
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs'; // ToDO explain

import { ProductSearchResponse, Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root', // ToDO explain
})
export class ProductService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

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
      .get<ProductSearchResponse>(`${this.apiBaseUrl}/products`, { params })
      .pipe(
        map((response) => response.products || []),
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
