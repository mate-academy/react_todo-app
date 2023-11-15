import React from 'react';
import { Status } from '../types/Status';
import { TodoContext } from './TodoContext';

export const Footer: React.FC = () => {
  const {
    visibleTodos,
    setFilterStatus,
    setIsCompleted,
    todos,
    filterStatus,
  } = React.useContext(TodoContext);
  const handleFilterChange = (filter: Status) => {
    setFilterStatus(filter);
  };

  const clearCompleted = () => {
    setIsCompleted([]);
  };

  const noCompleteTodos = visibleTodos.filter(
    (todo) => todo.status !== Status.Completed,
  );

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${noCompleteTodos.length === 1 ? `${noCompleteTodos.length} item left` : `${noCompleteTodos.length} items left`}`}
          </span>

          <ul className="filters">
            <li>
              <a
                onClick={() => handleFilterChange(Status.All)}
                href="#/"
                className={
                  filterStatus === Status.All ? 'selected' : ''
                }
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={
                  filterStatus === Status.Active ? 'selected' : ''
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
                  filterStatus === Status.Completed ? 'selected' : ''
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
      )}
    </>
  );
};
