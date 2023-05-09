import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';

// import Home from '../pages/Home';
// import CartPizza from '../pages/CartPizza/CartPizza';
// import FullPizza from '../pages/FullPizza';
// import NotFoundPage from '../pages/NotFoundPage';

import { HOME_LOCATION } from '../constants/homeLocation';

import '../scss/app.scss';

const CartPizza = React.lazy(() => import('../pages/CartPizza/CartPizza'));
const FullPizza = React.lazy(() => import('../pages/FullPizza'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));
const Home = React.lazy(() => import('../pages/Home'));

function App() {
  return (
    <>
      <Routes>
        <Route path={HOME_LOCATION} element={<MainLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="cart"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CartPizza />
              </Suspense>
            }
          />
          <Route
            path="pizza/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
