import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';

export const Footer: React.FC = () => {
  const {
    activeTodos,
    handleClearCompleted,
    completedTodos,
    handleFilterClick,
  } = useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className="selected"
            onClick={(event) => handleFilterClick('all', event)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={(event) => handleFilterClick('active', event)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={(event) => handleFilterClick('completed', event)}
          >
            Completed
          </a>
        </li>
      </ul>

      {completedTodos.length !== 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
