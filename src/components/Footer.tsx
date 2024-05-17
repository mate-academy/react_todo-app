import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { Filter } from '../types/Filter';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, handleFilterChange, filter, clearCompleted } =
    useContext(TodoContext);

  const counter = todos.filter(todo => !todo.completed).length;

  return (
    !!todos.length && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {counter} items left
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: filter === Filter.All,
            })}
            data-cy="FilterLinkAll"
            onClick={() => handleFilterChange(Filter.All)}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filter === Filter.Active,
            })}
            data-cy="FilterLinkActive"
            onClick={() => handleFilterChange(Filter.Active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filter === Filter.Completed,
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => handleFilterChange(Filter.Completed)}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          disabled={todos.every(todo => !todo.completed)}
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
