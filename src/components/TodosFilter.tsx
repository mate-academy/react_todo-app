import { useCallback, useContext, useMemo } from 'react';
import { TodosContext } from './TodosContext';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const TodosFilter: React.FC = () => {
  const {
    todos,
    handleStatus,
    selectedStatus,
    setTodos,
  } = useContext(TodosContext);

  const itemsLeftCount = useMemo(() => {
    return todos.filter(todo => todo.completed === false).length;
  }, [todos]);

  const handleDeleteClick = useCallback(() => {
    const filterTodos = (prevTodos: Todo[]) => prevTodos
      .filter((todoitem) => todoitem.completed === false);

    setTodos(filterTodos(todos));
  }, [todos]);

  const handleStatusClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    status: Status,
  ) => {
    event.preventDefault();
    handleStatus(status);
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${itemsLeftCount} items left`}
          </span>

          <ul className="filters" data-cy="todosFilter">
            <li>
              <a
                href="/"
                className={selectedStatus === Status.All ? 'selected' : ''}
                onClick={(event) => handleStatusClick(event, Status.All)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="/active"
                className={selectedStatus === Status.Active ? 'selected' : ''}
                onClick={(event) => handleStatusClick(event, Status.Active)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="/completed"
                className={selectedStatus === Status.Completed
                  ? 'selected'
                  : ''}
                onClick={(event) => handleStatusClick(event, Status.Completed)}
              >
                Completed
              </a>
            </li>
          </ul>

          {itemsLeftCount < todos.length && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleDeleteClick}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
