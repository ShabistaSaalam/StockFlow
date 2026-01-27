import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:5172/orders';

  constructor(private http: HttpClient) {}

  placeOrder(productId: number, quantity: number): Observable<any> {
    return this.http.post(this.apiUrl, {
      productId,
      quantity
    });
  }
}
