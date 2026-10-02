import React from 'react';
import cn from 'classnames';
import { Filter as FilterType } from '../types/Filter';

type Props = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export const Filter: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: filter === FilterType.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => onFilterChange(FilterType.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: filter === FilterType.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => onFilterChange(FilterType.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: filter === FilterType.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => onFilterChange(FilterType.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
