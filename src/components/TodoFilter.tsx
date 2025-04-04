import React from 'react';
import { FILTERS } from '../types/Todo';
import { useTodo } from '../context/TodoContext';

export const TodoFilter: React.FC = () => {
  const { filterType, handleFilterChange } = useTodo();

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filterType === FILTERS.all ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={e => {
          e.preventDefault();
          handleFilterChange(FILTERS.all);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filterType === FILTERS.active ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={e => {
          e.preventDefault();
          handleFilterChange(FILTERS.active);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filterType === FILTERS.completed ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={e => {
          e.preventDefault();
          handleFilterChange(FILTERS.completed);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
