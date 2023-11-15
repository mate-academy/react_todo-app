import React from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { TodoContext } from './TodoContext';

type Props = {
  setIsCompleted: (value: []) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({ setIsCompleted, todos }) => {
  const { visibleTodos, setFilterStatus } = React.useContext(TodoContext);

  const handleFilterChange = (filter: Status) => {
    setFilterStatus(filter);
  };

  const clearCompleted = () => {
    setIsCompleted([]);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${visibleTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            onClick={() => handleFilterChange(Status.All)}
            href="#/"
            className={visibleTodos.length === todos.length ? 'selected' : ''}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={
              visibleTodos.some(todo => todo.status === Status.Active)
                ? 'selected'
                : ''
            }
            onClick={() => handleFilterChange(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={
              visibleTodos.some(todo => todo.status === Status.Completed)
                ? 'selected'
                : ''
            }
            onClick={() => handleFilterChange(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {todos.length > 0 && (
        <button
          onClick={clearCompleted}
          type="button"
          className="clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
