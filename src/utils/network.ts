import axios from 'axios';
import { PizzaItem } from '../store/slices/pizza/types';

const getApiResource: (url: string) => Promise<PizzaItem> = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export default getApiResource;
