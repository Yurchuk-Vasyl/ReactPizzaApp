import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import CartItem from '../../components/CartItem/CartItem';
import CartEmpty from '../../components/CartEmpty/CartEmpty';

import { clearItems } from '../../store/slices/cart/cartSlice';

import cart from './img/cart.svg';
import bin from './img/bin.svg';
import { selectCart } from '../../store/slices/cart/selectors';

// type itemsProps =  {sum: number; item: { count: number }}[];

const CartPizza: React.FC = () => {
  const dispatch = useDispatch();

  const { items, totalPrice } = useSelector(selectCart);

  const totalCount = items.reduce((sum: number, item: { count: number }) => {
    return item.count + sum;
  }, 0);

  const onClickRemoveItems = () => {
    dispatch(clearItems());
  };
  return (
    <>
      {items.length ? (
        <div className="container container--cart">
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">
                <span>
                  <img src={cart} alt="cart"></img>
                </span>{' '}
                Корзина
              </h2>
              <div onClick={onClickRemoveItems} className="cart__clear">
                <span>
                  <img src={bin} alt="bin"></img>{' '}
                </span>
                <div>Очистить корзину</div>
              </div>
            </div>
            <div className="content__items">
              {items.map((item: any) => {
                return <CartItem key={item.id} {...item} />;
              })}
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  {' '}
                  Всего пицц: <b>{totalCount} шт.</b>{' '}
                </span>
                <span>
                  {' '}
                  Сумма заказа: <b>{totalPrice}₴ </b>{' '}
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link
                  to=".."
                  relative="route"
                  className="button button--outline button--add go-back-btn"
                >
                  <span>Вернуться назад</span>
                </Link>
                <div className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </>
  );
};

export default CartPizza;
