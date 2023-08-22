import React, {
  useCallback,
  useContext,
  useMemo,
} from 'react';
import cn from 'classnames';
import { TodosContext } from '../../TodoContext/TodosContext';
import { Status } from '../../Enum/Status';
import { Todo } from '../../Interface/Todo';

export const TodoFooter: React.FC = () => {
  const {
    todos,
    setTodos,
    filterBy,
    setFilterBy,
  } = useContext(TodosContext);

  const uncompletedTodos = useMemo(() => {
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
            {`${uncompletedTodos} item${uncompletedTodos !== 1 ? 's' : ''} left`}
          </span>

          <ul className="filters" data-cy="todosFilter">
            <li>
              <a
                href="#/"
                className={cn({
                  selected: Status.ALL === filterBy,
                })}
                onClick={() => setFilterBy(Status.ALL)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={cn({
                  selected: Status.ACTIVE === filterBy,
                })}
                onClick={() => setFilterBy(Status.ACTIVE)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={cn({
                  selected: Status.COMPLETED === filterBy,
                })}
                onClick={() => setFilterBy(Status.COMPLETED)}
              >
                Completed
              </a>
            </li>
          </ul>
          {uncompletedTodos !== todos.length && (
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
