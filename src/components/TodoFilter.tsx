import { useGlobalDispatch, useGlobalState } from '../context/store';
import { Filter } from '../types/Filter';
import classNames from 'classnames';
import React from 'react';

export const TodoFilter: React.FC = () => {
  const { filterStatus } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const handleFilter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const filterParam = event.currentTarget.textContent;

    if (filterParam === filterStatus) {
      return;
    }

    dispatch({ type: 'setFilterStatus', payload: filterParam as Filter });
  };

  const filterParams = Object.values(Filter);

  return (
    <nav className="filter" data-cy="Filter">
      {filterParams.map(param => {
        return (
          <a
            key={param}
            href={`#/${param.toLocaleLowerCase()}`}
            className={classNames('filter__link', {
              selected: filterStatus === param,
            })}
            data-cy={`FilterLink${param}`}
            onClick={handleFilter}
          >
            {param}
          </a>
        );
      })}
    </nav>
  );
};
