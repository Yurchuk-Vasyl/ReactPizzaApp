import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home';
import CartPizza from '../pages/CartPizza/CartPizza';
import FullPizza from '../pages/FullPizza';
import NotFoundPage from '../pages/NotFoundPage';

import { HOME_LOCATION } from '../constants/homeLocation';

import '../scss/app.scss';

function App() {
  return (
    <>
      <Routes>
        <Route path={HOME_LOCATION} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<CartPizza />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
