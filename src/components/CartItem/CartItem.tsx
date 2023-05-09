import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import React from 'react';
import {
  addItem,
  removeItem,
  clearItem,
} from '../../store/slices/cart/cartSlice';

import minus from './img/minus.svg';
import close from './img/close.svg';
import plus from './img/plus.svg';

type CartItemProps = {
  id: string;
  title: string;
  price: number;
  type: string;
  img: string;
  count: number;
  size: number;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  type,
  img,
  count,
  size,
}) => {
  const dispatch = useDispatch();
  const itemsPizza: CartItemProps = {
    id,
    title,
    price,
    type,
    img,
    count,
    size,
  };
  const onClickPlus = () => {
    dispatch(addItem(itemsPizza));
  };

  const onClickMinus = () => {
    dispatch(removeItem(id));
  };

  const onClickRemoveItem = () => {
    dispatch(clearItem(id));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={img} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type} тесто, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={onClickMinus}
          className={clsx(
            'button button--outline button--circle cart__item-count-minus',
            { 'cart__item-count-minus--disabled': count === 1 }
          )}
        >
          <img src={minus} alt="minus" />
        </div>
        <b>{count}</b>
        <div
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <img src={plus} alt="plus" />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{count * price}₴</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={onClickRemoveItem}
          className="button button--outline button--circle cart__item-count-close"
        >
          <img src={close} alt="close" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
