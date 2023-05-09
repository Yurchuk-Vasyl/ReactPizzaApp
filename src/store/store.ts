import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filterReducer from './slices/filter/filterSlice';
import cartReducer from './slices/cart/cartSlice';
import pizzas from './slices/pizza/pizzasSlice';

export const store = configureStore({
  reducer: { filter: filterReducer, cart: cartReducer, pizzas: pizzas },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
