import React from 'react';
import './Footer.css';

export const Footer = ({
  todos,
  filteredActive,
  filteredCompleted,
  handleReset,
  handleClearCompleted,
  indexTab,
}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {todos.filter(elem => elem.completed === false).length} items left
    </span>

    <ul className="filters">
      <li onClick={handleReset}>
        <a href="#/" className={indexTab === false ? 'selected' : ''}>
          All
        </a>
      </li>

      <li onClick={filteredActive}>
        <a href="#/active" className={indexTab === 'active' ? 'selected' : ''}>
          Active
        </a>
      </li>

      <li onClick={filteredCompleted}>
        <a href="#/completed" className={indexTab === 'completed' ? 'selected' : ''}>
          Completed
        </a>
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
