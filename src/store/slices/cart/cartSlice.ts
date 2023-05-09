import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import getTotalPrice from '../../../services/getTotalPrice';
import { getLocalStorage } from '../../../utils/localStorage';
import { calcTotalPrice } from '../../../utils/calcTotalPriceInitial';
import { CartItem, CartSliceState } from './types';

const initialState: CartSliceState = {
  totalPrice: calcTotalPrice(getLocalStorage('cartPizzas')),
  items: getLocalStorage('cartPizzas'),
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
      if (findItem && findItem.count > 1) findItem.count--;
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

export const { addItem, removeItem, clearItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
