import { useState, useEffect, useRef } from 'react';

import { Sort, SortPropertyEnum } from '../store/slices/filterSlice';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type SortProps = {
  value: { sortProperty: string; name: string };
  onChangeSort: (obj: Sort) => void;
};

export const list: SortItem[] = [
  { sortProperty: SortPropertyEnum.RATING_DESC, name: 'популярности(desk)' },
  { sortProperty: SortPropertyEnum.RATING_ASC, name: 'популярности(ask)' },
  { sortProperty: SortPropertyEnum.PRICE_DESC, name: 'цене(desk)' },
  { sortProperty: SortPropertyEnum.PRICE_ASC, name: 'цене(ask)' },
  { sortProperty: SortPropertyEnum.TITLE_DESC, name: 'алфавиту(desk)' },
  { sortProperty: SortPropertyEnum.TITLE_ASC, name: 'алфавиту(ask)' },
];

const SortComp: React.FC<SortProps> = ({ value, onChangeSort }) => {
  const sortRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const handleClickSort = (e: MouseEvent) => {
      if (e.target && sortRef.current) {
        const _target = e.target as EventTarget & {
          closest: (selector: string) => Element | null;
        };
        if (!_target.closest(`.${sortRef.current.className}`)) {
          setActive(false);
        }
      }
    };

    if (active) {
      document.body.addEventListener('click', handleClickSort);
    }

    return () => {
      document.body.removeEventListener('click', handleClickSort);
    };
  }, [active]);

  const onClickListItem = (obj: SortItem) => {
    onChangeSort(obj);
    setActive(false);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={active ? '' : 'svg__disabled'}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <div>Сортировка по:</div>
        <span onClick={() => (active ? setActive(false) : setActive(true))}>
          {value.name}
        </span>
      </div>
      {active && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => {
              return (
                <li
                  onClick={() => onClickListItem(obj)}
                  className={
                    value.sortProperty === obj.sortProperty ? 'active' : ''
                  }
                  key={index}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortComp;
