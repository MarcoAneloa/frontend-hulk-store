import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { DATA } from '../pages/mock-data';
import { Observable } from 'rxjs';
import { Product } from '../pages/shared/product.model';

@Injectable()
export class DataService {

  url: string = `${environment.HOST}/products`;

  constructor(private http: HttpClient) { }

  getData(): Promise<any> {
    return this.http.get<Product[]>(this.url).toPromise();
  }

  getRemoteData(url): Observable<any> {
    return this.http.get(url)
 /*      .map(this.extractData) */
    /*   .catch(this.handleError); */
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}