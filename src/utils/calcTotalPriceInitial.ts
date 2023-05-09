import { CartItem } from '../store/slices/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.count * obj.price + sum, 0);
};
