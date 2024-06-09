import React, { useContext } from 'react';
import classNames from 'classnames';
import { PropsFooter, Todo, IsActiveTab } from '../types';
import { TodosContext } from '../Store';

export const Footer: React.FC<PropsFooter> = ({ isActive, setIsActiveTab }) => {
  const { todos, setTodos } = useContext(TodosContext);

  function handleClearCompleted() {
    const newList = todos.filter((todo: Todo) => !todo.completed);

    setTodos(newList);
  }

  const activeTodos = todos.filter((todo: Todo) => !todo.completed);
  const completedTodos = todos.some((todo: Todo) => todo.completed);

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
            selected: isActive === IsActiveTab.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            setIsActiveTab(IsActiveTab.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: isActive === IsActiveTab.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            setIsActiveTab(IsActiveTab.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: isActive === IsActiveTab.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            setIsActiveTab(IsActiveTab.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        disabled={completedTodos ? false : true}
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
