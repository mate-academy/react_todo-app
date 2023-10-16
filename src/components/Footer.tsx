import React, {
  useContext,
} from 'react';
import classNames from 'classnames';
import { TodosContext } from './TodosContext';
import { Status } from '../types/Status';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const {
    todos,
    setTodos,
    setToggleAllStatus,
    filterStatus,
    setFilterStatus,
  } = useContext(TodosContext);

  const handleClearTodo = () => {
    setTodos(todos.filter(todo => !todo.completed));
    setToggleAllStatus(false);
  };

  const uncompletedTodos = todos.filter(todo => !todo.completed).length;

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
                className={classNames({
                  selected: Status.ALL === filterStatus,
                })}
                onClick={() => setFilterStatus(Status.ALL)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames({
                  selected: Status.ACTIVE === filterStatus,
                })}
                onClick={() => setFilterStatus(Status.ACTIVE)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames({
                  selected: Status.COMPLETED === filterStatus,
                })}
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
              onClick={handleClearTodo}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
