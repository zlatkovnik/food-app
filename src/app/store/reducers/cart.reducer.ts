import { Action, createReducer, on } from '@ngrx/store';
import CartItem from 'src/app/models/CartItem';
import { addToCart, removeFromCart } from '../actions/cart.actions';

export const cartFeatureKey = 'cart';

export interface State {
  cartItems: CartItem[];
}

export const initialState: State = {
  cartItems: [],
};

export const _cartReducer = createReducer(
  initialState,
  on(addToCart, (state, cartItem) => ({
    ...state,
    cartItems: [...state.cartItems, cartItem],
  })),
  on(removeFromCart, (state, { id }) => ({
    ...state,
    cartItems: state.cartItems.filter((item) => item.id != id),
  }))
);

export function cartReducer(state: State | undefined, action: Action) {
  return _cartReducer(state, action);
}
