import React, { useContext } from 'react';

import { TodoContext } from '../context/TodoContext';

export const TodoFilters: React.FC = () => {
  const { filter, setFilter } = useContext(TodoContext);

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={() => setFilter('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={() => setFilter('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilter('completed')}
      >
        Completed
      </a>
    </nav>
  );
};
