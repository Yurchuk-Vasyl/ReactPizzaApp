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
        <img src={pizza.imageUrl} alt="pizza" />
        <h2>{pizza.name}</h2>
        <h4>{pizza.price}₴</h4>
      </div>
    </>
  );
};

export default FullPizza;
