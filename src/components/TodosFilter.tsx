import classNames from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';

export const TodosFilter: React.FC = React.memo(() => {
  const { todos, setTodos } = useContext(TodosContext);
  const { filterBy, setFilterBy } = useContext(TodosContext);

  const counter = () => {
    const count = todos.filter(todo => !todo.completed).length;

    if (count === 1) {
      return `${count} item left`;
    }

    return `${count} items left`;
  };

  const counterCompleted = () => todos.filter(todo => todo.completed).length;

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filterHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setFilterBy(event.currentTarget.textContent || 'All');
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span
            className="todo-count"
            data-cy="todosCounter"
          >
            {counter()}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({ selected: filterBy === 'All' })}
                onClick={filterHandler}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames({ selected: filterBy === 'Active' })}
                onClick={filterHandler}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames({ selected: filterBy === 'Completed' })}
                onClick={filterHandler}
              >
                Completed
              </a>
            </li>
          </ul>

          {counterCompleted() > 0 && (
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
});
