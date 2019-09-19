import React from 'react';
import './Footer.css';

export const Footer = ({
  todos,
  filteredActive,
  filteredCompleted,
  handleReset,
  handleClearCompleted,
}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {todos.filter(elem => elem.completed === false).length} items left
    </span>

    <ul className="filters">
      <li onClick={handleReset}>
        <a href="#/" className="selected">
          All
        </a>
      </li>

      <li onClick={filteredActive}>
        <a href="#/active">Active</a>
      </li>

      <li onClick={filteredCompleted}>
        <a href="#/completed">Completed</a>
      </li>
    </ul>

    {todos.filter(todo => todo.completed).length > 0 && (
      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    )}
  </footer>
);

export default Footer;
