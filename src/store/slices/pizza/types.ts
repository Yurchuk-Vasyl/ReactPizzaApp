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

export interface PizzasSliceState {
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
