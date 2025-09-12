import React, { useContext } from 'react';
import cn from 'classnames';
import { TodoContext } from '../Context';
import { FilterType } from '../../types/FilterType';

export const Filter: React.FC = () => {
  const { filterType, setFilterType } = useContext(TodoContext);

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(FilterType).map(filter => {
        return (
          <a
            key={filter}
            href={`#/${filter}`}
            className={cn('filter__link', {
              selected: filterType === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => setFilterType(filter)}
          >
            {filter}
          </a>
        );
      })}
    </nav>
  );
};
