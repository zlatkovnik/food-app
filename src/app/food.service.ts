import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import IOrder from './models/IOrder';
import IFood from './models/IFood';

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

  getFoods(): Observable<IFood[]> {
    return this.http.get<IFood[]>(this.foodUrl);
  }

  addOrder(order: IOrder) {
    return this.http.post<IOrder>(
      this.orderUrl,
      JSON.stringify(order),
      this.httpOptions
    );
  }

  addOrders(orders: IOrder[]) {
    return from(orders).pipe(mergeMap((order) => this.addOrder(order)));
  }

  getOrders() {
    return this.http.get<IOrder[]>(this.orderUrl);
  }

  removeOrder(id: number) {
    return this.http.delete<IOrder>(`${this.orderUrl}/${id}`, this.httpOptions);
  }

  removeAllOrders(orders: IOrder[]) {
    return from(orders.map((order) => order.id)).pipe(
      mergeMap((id) => this.removeOrder(id))
    );
  }
}
