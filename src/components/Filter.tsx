import React from 'react';
import { FilterType } from '../types/FilterType';
import classNames from 'classnames';
import { useTodos } from '../hooks/useTodos';

export const Filter: React.FC = () => {
  const { filter, setFilter } = useTodos();

  const handleSelect = (type: FilterType) => () => {
    setFilter(type);
  };

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(FilterType).map(filterItem => (
        <a
          key={filterItem}
          href={`#/${filterItem}`}
          className={classNames('filter__link', {
            selected: filter === filterItem,
          })}
          data-cy={`FilterLink${filterItem}`}
          onClick={handleSelect(filterItem)}
        >
          {filterItem}
        </a>
      ))}
    </nav>
  );
};
