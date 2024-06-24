import React, { useContext } from 'react';
import { Status } from '../types/Status';
import { visiableTodos } from '../utils/getVisiableTodos';
import { TodosContext } from '../utils/TodosContext';
import classNames from 'classnames';

type Props = {
  queryStatus: Status;
  setQueryStatus: (status: Status) => void;
};

export const Footer: React.FC<Props> = ({ queryStatus, setQueryStatus }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {visiableTodos(todos, Status.active).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: queryStatus === Status.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setQueryStatus(Status.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: queryStatus === Status.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setQueryStatus(Status.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: queryStatus === Status.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setQueryStatus(Status.completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={visiableTodos(todos, Status.completed).length < 1}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
