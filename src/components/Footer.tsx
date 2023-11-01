import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';

export const Footer: React.FC = () => {
  const {
    activeTodos,
    handleClearCompleted,
    completedTodos,
  } = useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">All</a>
        </li>

        <li>
          <a href="#/active">Active</a>
        </li>

        <li>
          <a href="#/completed">Completed</a>
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
