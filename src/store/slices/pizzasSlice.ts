import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store.js';

import getApiResource from '../../utils/network';

import { API_PIZZA_DATA } from '../../constants/api';

export type PizzaItem = {
  name: string;
  id: string;
  price: number;
  imageUrl: string;
  types: [];
  sizes: [];
  rating: number;
}[];

export enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

interface PizzasSliceState {
  itemsPizza: PizzaItem;
  status: Status;
}

export type FetchPizzasArgs = {
  currentPage: number;
  category: string;
  sortBy: string;
  order: string;
  searchValue: string;
};
// is object of string key and value Record<string, string>;

export const fetchPizzas = createAsyncThunk<PizzaItem, FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async ({ currentPage, category, sortBy, order, searchValue }) => {
    const data = await getApiResource(
      `${API_PIZZA_DATA}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`
    );

    return data;
  }
);

const initialState: PizzasSliceState = {
  itemsPizza: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem>) {
      state.itemsPizza = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.itemsPizza = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.itemsPizza = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.itemsPizza = [];
    });
  },

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.itemsPizza = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.status = 'success';
  //     state.itemsPizza = action.payload;
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     console.log('error');
  //     state.status = 'error';
  //     state.itemsPizza = [];
  //   },
  // },
});

export const selectPizzasData = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
