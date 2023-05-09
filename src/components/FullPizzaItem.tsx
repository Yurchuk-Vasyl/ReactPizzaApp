import React from 'react';
import { Link } from 'react-router-dom';

export interface FullPizzaType {
  imageUrl: string;
  name: string;
  price: number;
}

const FullPizzaItem = (pizza: FullPizzaType) => {
  return (
    <>
      <div className="container">
        <div className="fullpizza">
          <img className="fullpizza__image" src={pizza.imageUrl} alt="pizza" />
          <div className="fullpizza__info">
            <h2 className="fullpizza__title">Назва : {pizza.name}</h2>
            <div className="fullpizza__price">Ціна :{pizza.price}₴</div>
            <div className="fullpizza__text">
              Lorem Ipsum - это текст-"рыба", часто используемый в печати и
              вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов
              на латинице с начала XVI века. В то время некий безымянный
              печатник создал большую коллекцию размеров и форм шрифтов,
              используя Lorem Ipsum для распечатки образцов.
            </div>
            <div className="cart__bottom-buttons">
              <Link
                to=".."
                relative="route"
                className="button button--outline button--add go-back-btn"
              >
                <span>Вернуться назад</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPizzaItem;
