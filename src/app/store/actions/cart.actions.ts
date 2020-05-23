import { createAction, props } from '@ngrx/store';
import CartItem from 'src/app/models/CartItem';

export const getCartItems = createAction('[Cart Component] GetCartItems');

export const addToCart = createAction(
  '[Cart Component] AddToCart',
  props<CartItem>()
);

export const removeFromCart = createAction(
  '[Cart Component] RemoveFromCart',
  props<CartItem>()
);
