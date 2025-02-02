import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  // Read
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + '/api/Products');
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.baseApiUrl + '/api/Products/' + id);
  }

  // Create
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseApiUrl + '/api/Products', product);
  }

  // Delete
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(this.baseApiUrl + '/api/Products?id=' + id);
  }

  // Update -- Populate Form, Submit Form
  private selectedProduct = new BehaviorSubject<Product | null>(null);
  selectedProduct$ = this.selectedProduct.asObservable();

  populateForm(id: string) {

    this.getProduct(id)
      .subscribe({
        next: (product) => {
          this.selectedProduct.next(product);
        },
        error: (response) => {
          console.log(response);
        }
      })
  }

  updateProduct(id:string, product: Product): Observable<Product> {
    return this.http.put<Product>(this.baseApiUrl + '/api/Products/' + id, product);
  }
}
