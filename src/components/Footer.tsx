import React, { useEffect, useState, useContext } from 'react';
import { Status } from '../services/Status';
import { TodosContext } from './TodosContext';

export const Footer: React.FC = () => {
  const {
    todos,
    clearForm,
    setFilter,
    filter,
  } = useContext(TodosContext);
  const [count, setCount] = useState(0);

  // Function to update the number of unfulfilled tasks
  const updateCount = () => {
    const counts = todos.filter(todo => !todo.completed).length;

    setCount(counts);
  };

  // Performed when you change the task list (Toodos)
  useEffect(() => {
    updateCount();
  }, [todos]);

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span
            className="todo-count"
            data-cy="todosCounter"
          >
            {`${count} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={filter === Status.ALL ? 'selected' : ''}
                onClick={() => setFilter(Status.ALL)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={filter === Status.ACTIVE ? 'selected' : ''}
                onClick={() => setFilter(Status.ACTIVE)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={filter === Status.COMPLETED ? 'selected' : ''}
                onClick={() => setFilter(Status.COMPLETED)}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={clearForm}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
