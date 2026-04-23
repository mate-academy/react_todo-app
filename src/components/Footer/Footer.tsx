import React from 'react';
import cn from 'classnames';

import { useTodos } from '../../hooks/useTodos';
import { useTodosView } from '../../hooks/useTodosView';

type Props = {};

const FooterBase: React.FC<Props> = () => {
  const { uncompletedTodos, completedTodos, clearCompletedTodos } = useTodos();
  const { filter, setFilter } = useTodosView();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          onClick={() => setFilter('all')}
          href="#/"
          className={cn('filter__link', {
            selected: filter === 'all',
          })}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          onClick={() => setFilter('active')}
          href="#/active"
          className={cn('filter__link', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          onClick={() => setFilter('completed')}
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};

export const Footer = React.memo(FooterBase);
