import React from 'react';
import cn from 'classnames';
import { Status } from '../types/Status';
import { TodoContext } from './TodoContext';

export const Footer: React.FC = () => {
  const {
    visibleTodos,
    setFilterStatus,
    setTodos,
    todos,
    filterStatus,
    setIsCompleted,
  } = React.useContext(TodoContext);

  const handleFilterChange = (filter: Status) => {
    setFilterStatus(filter);
  };

  const clearCompleted = () => {
    const checkboxAllStatus = todos.map(todo => {
      return { ...todo, status: Status.All };
    });

    setTodos(checkboxAllStatus);
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
                className={cn({ selected: filterStatus === Status.All })}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={cn({ selected: filterStatus === Status.Active })}
                onClick={() => handleFilterChange(Status.Active)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={cn({ selected: filterStatus === Status.Completed })}
                onClick={() => handleFilterChange(Status.Completed)}
              >
                Completed
              </a>
            </li>
          </ul>

          {todos.length && (
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
