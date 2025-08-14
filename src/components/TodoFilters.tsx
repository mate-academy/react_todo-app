import React from 'react';
import { useTodos } from './TodoContext';
import classNames from 'classnames';
import { FILTERS } from '../constants/filters';

export const TodoFilters: React.FC = () => {
  const { filter, setFilter } = useTodos();

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === FILTERS.all,
        })}
        data-cy="FilterLinkAll"
        onClick={e => {
          e.preventDefault();
          setFilter(FILTERS.all);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        data-cy="FilterLinkActive"
        className={classNames('filter__link', {
          selected: filter === FILTERS.active,
        })}
        onClick={e => {
          e.preventDefault();
          setFilter(FILTERS.active);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        data-cy="FilterLinkCompleted"
        className={classNames('filter__link', {
          selected: filter === FILTERS.completed,
        })}
        onClick={e => {
          e.preventDefault();
          setFilter(FILTERS.completed);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
