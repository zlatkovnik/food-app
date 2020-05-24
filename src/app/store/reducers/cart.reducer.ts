import { Action, createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart } from '../actions/cart.actions';
import CartItem from 'src/app/models/CartItem';

export interface State {
  cartItems: CartItem[];
}

export const initialState: State = {
  cartItems: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { cartItem }) => ({
    ...state,
    cartItems: [...state.cartItems, cartItem],
  }))
  // on(removeFromCart, (state, id) => ({
  //   ...state,
  //   cartItems: state.cartItems.filter((item) => item.id != id),
  // }))
);

export function reducer(state: State | undefined, action: Action) {
  return cartReducer(state, action);
}
