import { Component, OnInit } from '@angular/core';

import Food from '../../models/Food';
import { FoodService } from '../../services/food.service';
import CartItem from '../../models/CartItem';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { addToCart, removeFromCart } from 'src/app/store/actions/cart.actions';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
})
export class FoodsComponent implements OnInit {
  static cartItemId = 1;

  foods: Food[] = [];

  cart$: Observable<CartItem[]>;
  cartItems: CartItem[];

  constructor(
    private foodService: FoodService,
    private store: Store<CartItem[]>
  ) {
    //@ts-ignore
    this.cart$ = store.select((state) => state.cart);
    this.cart$.subscribe((items) => (this.cartItems = items));
  }

  ngOnInit(): void {
    this.foodService.getFoods().subscribe((foods) => (this.foods = foods));

    this.handleRemoveItemFromCart = this.handleRemoveItemFromCart.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }

  addToCart(food: Food): void {
    const cartItem: CartItem = {
      id: this.generateOrderId(),
      food: food,
    };
    this.store.dispatch(addToCart({ cartItem }));
  }

  generateOrderId(): number {
    return FoodsComponent.cartItemId++;
  }

  totalCost(): string {
    //TODO
    return '';
    // if (this.cart.length === 0) return '';
    // const cost = this.cart
    //   .map((cartItem) => cartItem.food.price)
    //   .reduce((acc, price) => acc + price);
    // return cost === 0 ? '' : cost.toString();
  }

  handleRemoveItemFromCart(cartItem: CartItem) {
    this.store.dispatch(removeFromCart({ cartItem }));
  }

  handleOrder() {
    // alert('Uspešno naručena hrana u vrednosti od ' + this.totalCost() + ' RSD');
    // const orders: Order[] = this.cart.map<Order>((cartItem) => ({
    //   id: cartItem.id,
    //   food: cartItem.food,
    //   date: new Date(),
    // }));
    // this.foodService.addOrders(orders).subscribe((food) => {
    //   this.cart = [];
    //   console.log('Narucena hrana', food);
    // });
  }
}
