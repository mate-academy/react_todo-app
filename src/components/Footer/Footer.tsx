import React from 'react';
import classNames from 'classnames';
import { useTodo } from '../../context/TodosContext';
import { Status } from '../../Enum/Status';

export const Footer = () => {
  const {
    todos,
    setTodos,
    setFilterBy,
    filterBy,
  } = useTodo();

  const notCompletedItems = todos.filter(todo => !todo.completed).length;

  const clearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${notCompletedItems} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames(
                  { selected: filterBy === Status.ALL },
                )}
                onClick={() => setFilterBy(Status.ALL)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                onClick={() => setFilterBy(Status.ACTIVE)}
                className={classNames(
                  { selected: filterBy === Status.ACTIVE },
                )}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                onClick={() => setFilterBy(Status.COMPLETED)}
                className={classNames(
                  { selected: filterBy === Status.COMPLETED },
                )}
              >
                Completed
              </a>
            </li>
          </ul>

          {todos.some(todo => todo.completed) && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}

        </footer>
      )}
    </>

  );
};
