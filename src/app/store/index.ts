import CartItem from '../models/CartItem';
import { CartState } from './reducers/cart.reducer';

export interface AppState {
  cart: CartState;
}

export const selectCart = (state: AppState) => state.cart;
