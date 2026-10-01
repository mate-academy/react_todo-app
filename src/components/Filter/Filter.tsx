import { useContext } from 'react';
import {
  DispatchContext,
  StateContext,
} from '../../context/TodoContextProvider';
import { FilterType } from '../../types/FilterType';
import cn from 'classnames';

export const Filter = () => {
  const { filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleFilterChange = (filterValue: FilterType) => {
    if (filterValue === filter) {
      return;
    }

    dispatch({ type: 'setFilter', payload: filterValue });
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', { selected: FilterType.All === filter })}
        data-cy="FilterLinkAll"
        onClick={() => {
          handleFilterChange(FilterType.All);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: FilterType.Active === filter,
        })}
        data-cy="FilterLinkActive"
        onClick={() => {
          handleFilterChange(FilterType.Active);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: FilterType.Completed === filter,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => {
          handleFilterChange(FilterType.Completed);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
