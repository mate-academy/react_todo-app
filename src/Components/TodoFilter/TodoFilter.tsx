import React from 'react';
import cn from 'classnames';
import {
  useTodos,
  useTodosDispatch,
  useTodosFilter,
} from '../TodoContext/TodoContext';
import { State } from '../../types/State';
import { Status } from '../../types/Status';

export const TodoFilter = React.memo(() => {
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const { filter, setFilter } = useTodosFilter();

  const handleFilterChange = (newFilter: Status) => {
    setFilter(newFilter);
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const showClearTodosButton = todos.filter((todo) => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={cn({ selected: filter === Status.All })}
            onClick={() => handleFilterChange(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: filter === Status.Active })}
            onClick={() => handleFilterChange(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: filter === Status.Completed })}
            onClick={() => handleFilterChange(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {showClearTodosButton.length < 0 && (
        <button
          onClick={() => {
            dispatch({ type: State.CLEAR_COMPLETED, completed: true });
          }}
          type="button"
          className="clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
