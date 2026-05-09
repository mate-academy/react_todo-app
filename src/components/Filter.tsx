import React from 'react';
import classNames from 'classnames';
import { FILTER } from '../constants/filter';
import { useTodos } from '../TodoContext';

export const Filter: React.FC = () => {
  const { filter } = useTodos();

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === FILTER.all,
        })}
        data-cy="FilterLinkAll"
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === FILTER.active,
        })}
        data-cy="FilterLinkActive"
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === FILTER.completed,
        })}
        data-cy="FilterLinkCompleted"
      >
        Completed
      </a>
    </nav>
  );
};
