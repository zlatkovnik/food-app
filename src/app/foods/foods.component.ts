import { Component, OnInit } from '@angular/core';

import IFood from '../models/IFood';
import { FoodService } from '../food.service';
import IOrder from '../models/IOrder';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
})
export class FoodsComponent implements OnInit {
  static orderId = 1;

  foods: IFood[] = [];
  cart: IOrder[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.getFoods().subscribe((foods) => (this.foods = foods));
    this.foodService.getOrders().subscribe((orders) => (this.cart = orders));

    this.handleRemoveItemFromCart = this.handleRemoveItemFromCart.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }

  addToCart(food: IFood): void {
    const order: IOrder = {
      id: this.generateOrderId(),
      food: food,
      date: new Date(),
    };
    this.foodService.addOrder(order).subscribe((_) => this.cart.push(order));
  }

  generateOrderId(): number {
    return FoodsComponent.orderId++;
  }

  totalCost(): string {
    if (this.cart.length === 0) return '';
    const cost = this.cart
      .map((order) => order.food.price)
      .reduce((acc, price) => acc + price);
    return cost === 0 ? '' : cost.toString();
  }

  handleRemoveItemFromCart(id: number) {
    this.foodService
      .removeOrder(id)
      .subscribe(
        (_) => (this.cart = this.cart.filter((order) => order.id != id))
      );
  }

  handleOrder() {
    alert('Uspešno naručena hrana u vrednosti od ' + this.totalCost());
    this.cart.forEach((order) =>
      this.foodService.removeOrder(order.id).subscribe((_) => (this.cart = []))
    );
  }
}
