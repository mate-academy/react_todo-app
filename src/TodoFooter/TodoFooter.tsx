import { useContext, useMemo, useCallback } from 'react';
import cn from 'classnames';

import { TodosContext } from '../TodosContext/TodosContext';
import { Status } from '../enum/Status';

export const TodoFooter = () => {
  const {
    todos,
    setTodos,
    filterStatus,
    setFilterStatus,
  } = useContext(TodosContext);

  const uncompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const clearCompletedTodo = useCallback(() => {
    const todosToComplete = todos
      .filter(todo => !todo.completed);

    setTodos(todosToComplete);
  }, [todos]);

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${uncompletedTodos} items left`}
          </span>

          <ul className="filters" data-cy="todosFilter">
            <li>
              <a
                href="#/"
                className={cn({ selected: Status.ALL === filterStatus })}
                onClick={() => setFilterStatus(Status.ALL)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={cn({ selected: Status.ACTIVE === filterStatus })}
                onClick={() => setFilterStatus(Status.ACTIVE)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={cn({ selected: Status.COMPLETED === filterStatus })}
                onClick={() => setFilterStatus(Status.COMPLETED)}
              >
                Completed
              </a>
            </li>
          </ul>

          {uncompletedTodos !== todos.length && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompletedTodo}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
