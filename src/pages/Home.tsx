import qs from 'qs';
import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import SortComp, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { useAppDispatch } from '../store/store';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../store/slices/filter/filterSlice';

import { fetchPizzas } from '../store/slices/pizza/pizzasSlice';
import { Sort } from '../store/slices/filter/types';
import { selectFilter } from '../store/slices/filter/selectors';
import { selectPizzasData } from '../store/slices/pizza/selectors';
import { Status } from '../store/slices/pizza/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);
  import('../utils/math').then((math) => {
    console.log(math.add(16, 26));
  });

  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(selectFilter);

  const { status, itemsPizza } = useSelector(selectPizzasData);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId === 0 ? '' : 'category=' + categoryId;
    dispatch(
      fetchPizzas({ order, sortBy, category, searchValue, currentPage })
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as {
        categoryId: string;
        sortProperty?: string;
        sort: Sort;
        currentPage: string;
      };
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      if (sort) {
        params.sort = sort;
        delete params.sortProperty;
      }
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [currentPage, categoryId, sortType.sortProperty]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortComp value={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === Status.ERROR ? (
        <div className="content__error-info">
          <h2>Error 404 😕 </h2>
          <p>Unfortunately we could not fetch data.Please try again later...</p>
        </div>
      ) : (
        <div className="content__items">
          {status === Status.LOADING
            ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
            : itemsPizza.map((obj: any) => {
                return (
                  <PizzaBlock
                    key={obj.id}
                    {...obj}
                    img={obj.imageUrl}
                    title={obj.name}
                  />
                );
              })}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(number: number) => onChangePage(number)}
      />
    </div>
  );
};

export default Home;
