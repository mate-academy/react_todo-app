import React, { useContext } from 'react';
import cn from 'classnames';

import { TodosContext } from '../TodosContext/TodosContext';
import { Status } from '../types/Status';

export const Footer: React.FC = () => {
  const {
    todos,
    setTodos,
    setStatus,
    status,
  } = useContext(TodosContext);

  const completedTodos = todos.filter(todo => !todo.completed);

  const hasCompleted = todos.some(todo => todo.completed);

  const clearComleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${completedTodos.length} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            className={cn({
              selected: status === Status.All,
            })}
            href="#/"
            onClick={() => setStatus(Status.All)}
          >
            {Status.All}
          </a>
        </li>

        <li>
          <a
            className={cn({
              selected: status === Status.Active,
            })}
            href="#/active"
            onClick={() => setStatus(Status.Active)}
          >
            {Status.Active}
          </a>
        </li>

        <li>
          <a
            className={cn({
              selected: status === Status.Completed,
            })}
            href="#/completed"
            onClick={() => setStatus(Status.Completed)}
          >
            {Status.Completed}
          </a>
        </li>
      </ul>

      {hasCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearComleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
