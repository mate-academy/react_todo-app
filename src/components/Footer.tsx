import React from 'react';
import classNames from 'classnames';
import { Filter } from '../enums/filter';

type Props = {
  filterValue: Filter;
  setFilter: (value: Filter) => void,
  hasCompletedTodos: boolean,
  amountOfActiveTodos: number,
  handleClearTodo: () => void,
};

export const Footer: React.FC<Props> = ({
  filterValue,
  setFilter,
  hasCompletedTodos,
  amountOfActiveTodos,
  handleClearTodo,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {amountOfActiveTodos === 1
        ? '1 item left'
        : `${amountOfActiveTodos} items left`}
    </span>

    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filterValue === Filter.All,
        })}
        onClick={() => setFilter(Filter.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterValue === Filter.Active,
        })}
        onClick={() => setFilter(Filter.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterValue === Filter.Completed,
        })}
        onClick={() => setFilter(Filter.Completed)}
      >
        Completed
      </a>
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      disabled={!hasCompletedTodos}
      onClick={handleClearTodo}
    >
      Clear completed
    </button>
  </footer>
);
