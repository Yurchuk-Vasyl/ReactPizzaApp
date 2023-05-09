export type CartItem = {
  title: string;
  id: string;
  price: number;
  img: string;
  type: string;
  size: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
