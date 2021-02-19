import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Category } from '../pages/shared/category.model';

@Injectable()
export class ProductCategoryService {
  productCategoryChange = new Subject<Category[]>();
  msgChange = new Subject<string>();

  url: string = `${environment.HOST}/categories`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Category[]>(this.url);
  }

  listId(idCategory: number) {
    return this.http.get<Category>(`${this.url}/${idCategory}`);
  }

  save(category: Category) {
    return this.http.post(this.url, category);
  }

  update(category: Category) {
    return this.http.put(this.url, category);
  }

  delete(idProduct: number) {
    return this.http.delete(`${this.url}/${idProduct}`);
  }

}
