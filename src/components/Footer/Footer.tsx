/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';

export const Footer: React.FC = () => {
  const {
    todos,
    setTodos,
    filter,
    setFilter,
  } = useContext(TodoContext);

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
    <footer
      className="todoapp__footer"
      data-cy="Footer"
    >
      <span
        className="todo-count"
        data-cy="TodosCounter"
      >
        {activeTodos} items left
      </span>

      <nav
        className="filter"
        data-cy="Filter"
      >
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={
            filter === 'All'
              ? 'filter__link selected'
              : 'filter__link'
          }
          onClick={() => setFilter('All')}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={
            filter === 'Active'
              ? 'filter__link selected'
              : 'filter__link'
          }
          onClick={() => setFilter('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={
            filter === 'Completed'
              ? 'filter__link selected'
              : 'filter__link'
          }
          onClick={() => setFilter('Completed')}
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
