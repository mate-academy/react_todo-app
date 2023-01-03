import React from 'react';
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
        <FilterLink text="All" to="/" />
        <FilterLink text="Active" to="/active" />
        <FilterLink text="Completed" to="/completed" />
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
