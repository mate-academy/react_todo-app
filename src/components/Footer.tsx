import React from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const Footer = () => {
  const { state } = React.useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {state.todos.length}
        <span> items left</span>
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

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
