import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../TodosContext';
import { Status } from '../types/Status';

export const Footer: React.FC = () => {
  const {
    todos,
    selectStatus,
    setSelectStatus,
    deletedCompled,
  } = useContext(TodosContext);

  const activeTodoAmount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const handleselectStatus = (status: Status) => () => {
    setSelectStatus(status);
  };

  const handleClearCompleted = () => {
    deletedCompled();
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodoAmount} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={selectStatus === Status.All ? 'selected' : ''}
                onClick={handleselectStatus(Status.All)}
                data-cy="todosFilter"
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={selectStatus === Status.Active ? 'selected' : ''}
                onClick={handleselectStatus(Status.Active)}
                data-cy="todosFilter"
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={selectStatus === Status.Completed
                  ? 'selected'
                  : ''}
                onClick={handleselectStatus(Status.Completed)}
                data-cy="todosFilter"
              >
                Completed
              </a>
            </li>
          </ul>

          { activeTodoAmount < todos.length && (
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
