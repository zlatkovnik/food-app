import { createAction, props } from '@ngrx/store';
import CartItem from 'src/app/models/CartItem';

export const addToCart = createAction(
  '[Cart Component] AddToCart',
  props<{ cartItem: CartItem }>()
);

export const removeFromCart = createAction(
  '[Cart Component] RemoveFromCart',
  props<{ cartItem: CartItem }>()
);
