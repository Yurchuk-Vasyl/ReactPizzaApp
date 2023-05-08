import React from 'react';
import { useRef, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../store/slices/filterSlice';

import searchIcon from './img/searchIcon.svg';
import clearIconActive from './img/closeActive.svg';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const testDobounce = useCallback(
    debounce((e: any) => {
      dispatch(setSearchValue(e.target.value));
    }, 300),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    testDobounce(e);
  };

  const onClickClear = () => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef?.current?.focus();
  };

  return (
    <div className={styles.input__container}>
      <img className={styles.searchIcon} src={searchIcon} alt="search icon" />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChangeInput(e)}
        className={styles.input}
        placeholder="search pizza..."
      />
      <img
        className={value ? styles.clearIcon : styles.clearIcon_none}
        src={clearIconActive}
        alt="clear"
        onClick={onClickClear}
      />
    </div>
  );
};

export default Search;
