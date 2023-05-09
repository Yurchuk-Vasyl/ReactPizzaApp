import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FullPizzaItem, { FullPizzaType } from '../components/FullPizzaItem';

const FullPizza: React.FC = () => {
  const navigation = useNavigate();
  const [pizza, setPizza] = useState<FullPizzaType>();
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
      <FullPizzaItem {...pizza} />
    </>
  );
};

export default FullPizza;
