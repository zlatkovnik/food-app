import { createAction, props } from '@ngrx/store';
import CartItem from 'src/app/models/CartItem';

export const addToCart = createAction(
  '[Cart] AddToCart Carts',
  props<CartItem>()
);
export const removeFromCart = createAction(
  '[Cart] RemoveFromCart Carts',
  props<CartItem>()
);
