import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const navigation = useNavigate();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://644d4f61cfdddac970a2158a.mockapi.io/items/${id}`)
      .then(({ data }) => setPizza(data))
      .catch(() => {
        alert('Error with getting pizza');
        navigation('..');
      });
  }, []);

  if (!pizza) {
    return <>Is Loading</>;
  }

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
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPizza;
