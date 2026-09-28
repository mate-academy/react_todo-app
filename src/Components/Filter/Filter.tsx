import React from 'react';
import { FILTERS } from '../../types/Filters';
import cn from 'classnames';

type Props = {
  selectedStatus: FILTERS;
  onSelectedStatus: (selectedStatus: FILTERS) => void;
};

export const Filter: React.FC<Props> = ({
  selectedStatus,
  onSelectedStatus,
}) => {
  const handleClick = (filter: FILTERS) => {
    onSelectedStatus(filter);
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: selectedStatus === FILTERS.all,
        })}
        data-cy="FilterLinkAll"
        onClick={() => handleClick(FILTERS.all)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: selectedStatus === FILTERS.active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => handleClick(FILTERS.active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: selectedStatus === FILTERS.completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => handleClick(FILTERS.completed)}
      >
        Completed
      </a>
    </nav>
  );
};
