import React from 'react';
import { FilterType, useTodo } from '../../context/TodoContext';

export const Filter: React.FC = () => {
  const { filter, setFilter } = useTodo();
  const onClick = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={event => {
          event.preventDefault();
          onClick('all');
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={event => {
          event.preventDefault();
          onClick('active');
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={event => {
          event.preventDefault();
          onClick('completed');
        }}
      >
        Completed
      </a>
    </nav>
  );
};
