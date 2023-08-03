import React, { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Status } from '../../Enum/Status';

export const Footer = () => {
  const {
    todos,
    setTodos,
    setFilterBy,
  } = useContext(TodosContext);

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
                className="selected"
                onClick={() => setFilterBy(Status.ALL)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                onClick={() => setFilterBy(Status.ACTIVE)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                onClick={() => setFilterBy(Status.COMPLETED)}
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
