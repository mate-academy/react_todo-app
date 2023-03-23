import React from 'react';
import { FilterTypes } from '../../types/FilterTypes';
import { Todo } from '../../types/Todo';
import { FiltersLink } from '../FiltersLink';

type Props = {
  activeTodos: Todo[],
  completedTodos: Todo[],
  setTodos: (todos: Todo[]) => void;
};

export const Footer = React.memo<Props>(({
  activeTodos,
  completedTodos,
  setTodos,
}) => {
  const clearCompleted = () => {
    localStorage.setItem('todos', JSON.stringify(activeTodos));
    setTodos(activeTodos);
  };

  return (
    <footer className="footer">
      <span
        className="todo-count"
        data-cy="todosCounter"
      >
        {`${activeTodos.length} items left`}
      </span>

      <ul
        className="filters"
        data-cy="todosFilter"
      >
        <li>
          <FiltersLink
            to="/"
            text="All"
          />
        </li>

        <li>
          <FiltersLink
            to={`/${FilterTypes.ACTIVE}`}
            text="Active"
          />
        </li>

        <li>
          <FiltersLink
            to={`/${FilterTypes.COMPLETED}`}
            text="Completed"
          />
        </li>
      </ul>

      {!!completedTodos.length
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
});
