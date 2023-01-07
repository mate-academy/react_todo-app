import React from 'react';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';
import { FilterLink } from '../FilterLink';

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
  const clearCompleated = () => {
    localStorage.setItem('todos', JSON.stringify(activeTodos));
    setTodos(activeTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <FilterLink text="All" to="/" />
        </li>

        <li>
          <FilterLink text="Active" to={`/${FilterType.ACTIVE}`} />
        </li>

        <li>
          <FilterLink text="Completed" to={`/${FilterType.COMPLETED}`} />
        </li>
      </ul>

      {!!completedTodos.length
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleated}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
});
