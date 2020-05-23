import { Component, OnInit } from '@angular/core';

import Food from '../../models/Food';
import { FoodService } from '../../services/food.service';
import Order from '../../models/Order';
import CartItem from '../../models/CartItem';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
})
export class FoodsComponent implements OnInit {
  static cartItemId = 1;

  foods: Food[] = [];
  cart: CartItem[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.getFoods().subscribe((foods) => (this.foods = foods));
    this.foodService.getOrders().subscribe((orders) => (this.cart = orders));

    this.handleRemoveItemFromCart = this.handleRemoveItemFromCart.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }

  addToCart(food: Food): void {
    const order: CartItem = {
      id: this.generateOrderId(),
      food: food,
    };
    this.cart.push(order);
  }

  generateOrderId(): number {
    return FoodsComponent.cartItemId++;
  }

  totalCost(): string {
    if (this.cart.length === 0) return '';
    const cost = this.cart
      .map((cartItem) => cartItem.food.price)
      .reduce((acc, price) => acc + price);
    return cost === 0 ? '' : cost.toString();
  }

  handleRemoveItemFromCart(id: number) {
    this.cart = this.cart.filter((cartItem) => cartItem.id != id);
  }

  handleOrder() {
    alert('Uspešno naručena hrana u vrednosti od ' + this.totalCost() + ' RSD');
    const orders: Order[] = this.cart.map<Order>((cartItem) => ({
      id: cartItem.id,
      food: cartItem.food,
      date: new Date(),
    }));
    this.foodService.addOrders(orders).subscribe((food) => {
      this.cart = [];
      console.log('Narucena hrana', food);
    });
  }
}
