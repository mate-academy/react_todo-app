import { useContext } from 'react';
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

  const ItemsLeft = () => {
    return todos.filter(todo => todo.completed === false).length;
  };

  const handleDeleteClick = () => {
    const filterTodos = (prevTodos: Todo[]) => prevTodos
      .filter((todoitem) => todoitem.completed === false);

    setTodos(filterTodos(todos));
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${ItemsLeft()} items left`}
          </span>

          <ul className="filters" data-cy="todosFilter">
            <li>
              <a
                href="#/"
                className={selectedStatus === Status.All ? 'selected' : ''}
                onClick={() => handleStatus(Status.All)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={selectedStatus === Status.Active ? 'selected' : ''}
                onClick={() => handleStatus(Status.Active)}
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
                onClick={() => handleStatus(Status.Completed)}
              >
                Completed
              </a>
            </li>
          </ul>

          {ItemsLeft() < todos.length && (
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
