import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Product } from '../pages/shared/product.model';

@Injectable()
export class ProductService {
  productChange = new Subject<Product[]>();
  msgChange = new Subject<string>();

  url: string = `${environment.HOST}/products`;

  constructor(private http: HttpClient) { }

  getData(): Promise<any> {
    return this.http.get<Product[]>(this.url).toPromise();
  }

  list() {
    return this.http.get<Product[]>(this.url);
  }

  listId(idProduct: number) {
    return this.http.get<Product>(`${this.url}/${idProduct}`);
  }

  save(product: Product) {
    return this.http.post(this.url, product);
  }

  update(product: Product) {
    return this.http.put(this.url, product);
  }

  delete(idProduct: number) {
    return this.http.delete(`${this.url}/${idProduct}`);
  }

}
