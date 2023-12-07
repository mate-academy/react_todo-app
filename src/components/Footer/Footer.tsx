import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { Status } from '../../types/Status';

export const Footer: React.FC = () => {
  const {
    todos,
    selectedStatus,
    setSelectedStatus,
    deletedComplatedTodos,
  } = useContext(TodosContext);

  const activeTodosCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const handleSelectedStatus = (status: Status) => () => {
    setSelectedStatus(status);
  };

  const handleClearCompleted = () => {
    deletedComplatedTodos();
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodosCount} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={selectedStatus === Status.All ? 'selected' : ''}
                onClick={handleSelectedStatus(Status.All)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={selectedStatus === Status.Active ? 'selected' : ''}
                onClick={handleSelectedStatus(Status.Active)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={selectedStatus === Status.Completed
                  ? 'selected'
                  : ''}
                onClick={handleSelectedStatus(Status.Completed)}
              >
                Completed
              </a>
            </li>
          </ul>

          { activeTodosCount < todos.length && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
