import React from 'react';
import { useTodos } from './TodoContext';
import classNames from 'classnames';

export const TodoFilters: React.FC = () => {
  const { filter, setFilter } = useTodos();

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', { selected: filter === 'All' })}
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
        className={classNames('filter__link', {
          selected: filter === 'Active',
        })}
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
        className={classNames('filter__link', {
          selected: filter === 'Completed',
        })}
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
