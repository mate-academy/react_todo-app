import React from 'react';
import { TodoContext } from './TodoContext';

export const Footer: React.FC = () => {
  const { todos } = React.useContext(TodoContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.length}
        items left
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">
            All
          </a>
        </li>

        <li>
          <a href="#/active">Active</a>
        </li>

        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
