type getTotalPriceProps = {
  items: { price: number; count: number }[];
  totalPrice: number;
};

const getTotalPrice = (state: getTotalPriceProps) => {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

export default getTotalPrice;
