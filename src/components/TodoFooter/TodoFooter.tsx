import {
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { TodosContext } from '../../TodoContext/TodosContext';
import { Status } from '../../Enum/Status';
import { Todo } from '../../Interface/Todo';

export const TodoFooter = () => {
  const {
    todos,
    setTodos,
    filterBy,
    setFilterBy,
  } = useContext(TodosContext);

  const uncomplitedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const deleteTodos = useCallback(() => {
    setTodos((currentTodos: Todo[]) => (
      currentTodos.filter((todo: Todo) => !todo.completed)
    ));
  }, [todos]);

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${uncomplitedTodos} items left`}
          </span>

          <ul className="filters" data-cy="todosFilter">
            <li>
              <a
                href="#/"
                className={
                  Status.ALL === filterBy
                    ? 'selected'
                    : ''
                }
                onClick={() => setFilterBy(Status.ALL)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={
                  Status.ACTIVE === filterBy
                    ? 'selected'
                    : ''
                }
                onClick={() => setFilterBy(Status.ACTIVE)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={
                  Status.COMPLETED === filterBy
                    ? 'selected'
                    : ''
                }
                onClick={() => setFilterBy(Status.COMPLETED)}
              >
                Completed
              </a>
            </li>
          </ul>
          {uncomplitedTodos !== todos.length && (
            <button
              type="button"
              className="clear-completed"
              onClick={deleteTodos}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
