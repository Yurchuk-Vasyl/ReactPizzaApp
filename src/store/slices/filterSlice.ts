import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  TITLE_DESC = 'title',
  PRICE_DESC = 'price',
  RATING_ASC = '-rating',
  PRICE_ASC = '-price',
  TITLE_ASC = '-title',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

// CHECK OUT SORTPROPERTY
// CHECK OUT SORTPROPERTY
// CHECK OUT SORTPROPERTY

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sortType: Sort;
  currentPage: number;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sortType: {
    name: 'популярности(desk)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(
      state,
      action: PayloadAction<{
        categoryId: string;
        sort: Sort;
        currentPage: string;
      }>
    ) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sort;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
