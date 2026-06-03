import React from 'react';
import cn from 'classnames';
import { FILTERS } from '../../utils/filters';

import { useTodo } from '../../context/TodoContext';

export const Filter: React.FC = () => {
  const { filter, setFilter } = useTodo();

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', { selected: filter === FILTERS.all })}
        data-cy="FilterLinkAll"
        onClick={event => {
          event.preventDefault();
          setFilter(FILTERS.all);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', { selected: filter === FILTERS.active })}
        data-cy="FilterLinkActive"
        onClick={event => {
          event.preventDefault();
          setFilter(FILTERS.active);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: filter === FILTERS.completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={event => {
          event.preventDefault();
          setFilter(FILTERS.completed);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
