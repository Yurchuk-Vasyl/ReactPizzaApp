import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import getTotalPrice from '../../services/getTotalPrice';
import { RootState } from '../store';

export type CartItem = {
  title: string;
  id: string;
  price: number;
  img: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      getTotalPrice(state);
    },

    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count > 0) findItem.count--;
      getTotalPrice(state);
    },

    clearItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      getTotalPrice(state);
    },

    clearItems(state) {
      if (window.confirm('Are you sure you want to remove?')) {
        state.items = [];
        state.totalPrice = 0;
      }
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
