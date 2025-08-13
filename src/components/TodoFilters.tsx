import React from 'react';
import { useTodos } from './TodoContext';

export const TodoFilters: React.FC = () => {
  const { filter, setFilter } = useTodos();

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filter === 'All' ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={e => {
          e.preventDefault();
          setFilter('All');
        }}
      >
        All
      </a>

      <a
        href="#/active"
        data-cy="FilterLinkActive"
        className={`filter__link ${filter === 'Active' ? 'selected' : ''}`}
        onClick={e => {
          e.preventDefault();
          setFilter('Active');
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        data-cy="FilterLinkCompleted"
        className={`filter__link ${filter === 'Completed' ? 'selected' : ''}`}
        onClick={e => {
          e.preventDefault();
          setFilter('Completed');
        }}
      >
        Completed
      </a>
    </nav>
  );
};
