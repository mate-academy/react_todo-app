/* eslint-disable prettier/prettier */

import classNames from "classnames";
import { useTodos } from "../store/TodosContext";
import { FilterStatus } from "../types/FilterStatus";

export const Footer = () => {
  const {
    activeTodosCount,
    completedTodosCount,
    filter,
    setFilter,
    clearCompleted,
  } = useTodos();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            'selected': filter === FilterStatus.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterStatus.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            'selected': filter === FilterStatus.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterStatus.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            'selected': filter === FilterStatus.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterStatus.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodosCount === 0}
        onClick={() => clearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
