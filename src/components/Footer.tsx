import classNames from 'classnames';
import { TodoContext } from '../context/TodoContext';
import React, { useContext } from 'react';
import { Status } from '../types/Status';

interface Props {
  activeTodosCount: number;
  handleClearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  handleClearCompleted,
}) => {
  const { todos, filter, setFilter } = useContext(TodoContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Status.All,
          })}
          data-cy="FilterLinkAll"
          onClick={event => {
            event.preventDefault();
            setFilter(Status.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={event => {
            event.preventDefault();
            setFilter(Status.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={event => {
            event.preventDefault();
            setFilter(Status.Completed);
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
        disabled={!todos.some(todo => todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
