import React from 'react';
import classNames from 'classnames';
import { PropsFooter } from '../types';

export const Footer: React.FC<PropsFooter> = ({
  todos,
  isActive,
  setIsActiveTab,
  setTodos,
}) => {
  function handleClearCompleted() {
    const newList = todos.filter(todo => todo.completed === false);

    setTodos(newList);
  }

  const activeTodos = todos.filter(todo => todo.completed === false);
  const completedTodos = todos.some(todo => todo.completed === true);

  return (
    // {/* Hide the footer if there are no todos */}
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: isActive.all === true,
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            setIsActiveTab({
              all: true,
              active: false,
              completed: false,
            });
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: isActive.active === true,
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            setIsActiveTab({
              all: false,
              active: true,
              completed: false,
            });
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: isActive.completed === true,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            setIsActiveTab({
              all: false,
              active: false,
              completed: true,
            });
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        disabled={completedTodos === true ? false : true}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => handleClearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
