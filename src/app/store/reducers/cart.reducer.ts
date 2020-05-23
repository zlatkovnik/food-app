import { Action, createReducer, on } from '@ngrx/store';
import {
  addToCart,
  removeFromCart,
  getCartItems,
} from '../actions/cart.actions';
import CartItem from 'src/app/models/CartItem';

//export const cartFeatureKey = 'cart';

export interface CartState {
  cartItems: CartItem[];
}

export const initialState: CartState = {
  cartItems: [],
};

export const _cartReducer = createReducer(
  initialState,
  on(getCartItems, (state) => state),
  on(addToCart, (state, cartItem) => ({
    ...state,
    cartItems: [...state.cartItems, cartItem],
  })),
  on(removeFromCart, (state, { id }) => ({
    ...state,
    cartItems: state.cartItems.filter((item) => item.id != id),
  }))
);

export function cartReducer(state: CartState | undefined, action: Action) {
  return _cartReducer(state, action);
}
