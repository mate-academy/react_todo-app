/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../context/TodoContext';
import { FILTERS } from '../../types/Filter';

export const Footer: React.FC = () => {
  const { todos, setTodos, filter, setFilter } = useContext(TodoContext);

  const activeTodos = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));

    setTimeout(() => {
      (
        document.querySelector(
          '[data-cy="NewTodoField"]',
        ) as HTMLInputElement | null
      )?.focus();
    }, 0);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={classNames('filter__link', {
            selected: filter === FILTERS.all,
          })}
          onClick={() => setFilter(FILTERS.all)}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={classNames('filter__link', {
            selected: filter === FILTERS.active,
          })}
          onClick={() => setFilter(FILTERS.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={classNames('filter__link', {
            selected: filter === FILTERS.completed,
          })}
          onClick={() => setFilter(FILTERS.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
