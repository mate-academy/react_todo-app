import React from 'react';
import { Todo } from '../../Types/Todo';
import { deleteTodo } from '../../api/api';

type Props = {
  sortQuery: string,
  activeTodos: number,
  setSearchParams: (arg: { filterBy: string } | {}) => any,
  todos: Todo[],
};

export const Footer: React.FC<Props> = ({
  setSearchParams,
  activeTodos,
  sortQuery,
  todos,
}) => {
  const clearCopleted = () => {
    return todos.forEach(todo => (
      (todo.completed === true) && deleteTodo(todo.id)
    ));
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      <ul className="filters">
        <li>
          <button
            type="button"
            className={!sortQuery ? 'selected' : ''}
            onClick={() => setSearchParams({})}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={sortQuery === 'active' ? 'selected' : ''}
            onClick={() => setSearchParams({ filterBy: 'active' })}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={sortQuery === 'completed' ? 'selected' : ''}
            onClick={() => setSearchParams({ filterBy: 'completed' })}
          >
            Completed
          </button>
        </li>
      </ul>
      {todos.some(todo => todo.completed === true) && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => clearCopleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
