import React from 'react';
import { useTodos } from '../context/TodoContext';
import { FILTERS } from '../constants/filters';

export const Filter: React.FC = () => {
  const { filter, setFilter } = useTodos();

  const handleFilterChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    newFilter: string,
  ) => {
    e.preventDefault();
    setFilter(newFilter);
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filter === FILTERS.all ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={e => handleFilterChange(e, FILTERS.all)}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filter === FILTERS.active ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={e => handleFilterChange(e, FILTERS.active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filter === FILTERS.completed ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={e => handleFilterChange(e, FILTERS.completed)}
      >
        Completed
      </a>
    </nav>
  );
};
