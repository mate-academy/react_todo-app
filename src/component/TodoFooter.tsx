import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../TodosContext';
import { Status } from '../types/Status';

export const TodoFooter:React.FC = () => {
  const {
    todos,
    setTodos,
    filterBy,
    setFilterBy,
    setIsToggleAllStatus,
  } = useContext(TodosContext);

  const uncompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const deleteTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
    setIsToggleAllStatus(false);
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${uncompletedTodos} item${uncompletedTodos !== 1 ? 's' : ''} left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({
                  selected: Status.all === filterBy,
                })}
                onClick={() => setFilterBy(Status.all)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/"
                className={classNames({
                  selected: Status.active === filterBy,
                })}
                onClick={() => setFilterBy(Status.active)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/"
                className={classNames({
                  selected: Status.completed === filterBy,
                })}
                onClick={() => setFilterBy(Status.completed)}
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
