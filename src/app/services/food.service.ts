import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import Order from '../models/Order';
import Food from '../models/Food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private foodUrl =
    'https://my-json-server.typicode.com/zlatkovnik/food-db/foods';
  private orderUrl =
    'https://my-json-server.typicode.com/zlatkovnik/food-db/orders';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.foodUrl);
  }

  addOrder(order: Order) {
    return this.http.post<Order>(
      this.orderUrl,
      JSON.stringify(order),
      this.httpOptions
    );
  }

  addOrders(orders: Order[]) {
    return from(orders).pipe(mergeMap((order) => this.addOrder(order)));
  }

  getOrders() {
    return this.http.get<Order[]>(this.orderUrl);
  }

  removeOrder(id: number) {
    return this.http.delete<Order>(`${this.orderUrl}/${id}`, this.httpOptions);
  }

  removeAllOrders(orders: Order[]) {
    return from(orders.map((order) => order.id)).pipe(
      mergeMap((id) => this.removeOrder(id))
    );
  }
}
