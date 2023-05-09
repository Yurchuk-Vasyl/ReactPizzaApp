import { CartItem } from '../store/slices/cart/types';

export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem('cartPizzas');
  return data ? (JSON.parse(data) as CartItem[]) : [];
};

// export const setLocalStorage = (array: CartItem[], current: boolean) => {
//   if (current) {
//     const json = JSON.stringify(array);
//     localStorage.setItem('cartPizzas', json);
//   }
// };
