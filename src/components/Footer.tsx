import React from 'react';
import cn from 'classnames';

import { useTodosContext } from '../context/TodoContext';
import { FilterStatus } from '../types/FilterStatus';

export const Footer: React.FC = () => {
  const { activeTodos, completedTodos, filter, setFilter, clearCompleted } =
    useTodosContext();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === FilterStatus.All,
          })}
          data-cy="FilterLinkAll"
          onClick={event => {
            event.preventDefault();

            setFilter(FilterStatus.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === FilterStatus.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={event => {
            event.preventDefault();

            setFilter(FilterStatus.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === FilterStatus.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={event => {
            event.preventDefault();

            setFilter(FilterStatus.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={!(completedTodos > 0)}
      >
        Clear completed
      </button>
    </footer>
  );
};
