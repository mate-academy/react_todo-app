import React from 'react';
import './Footer.css';

export const Footer = ({
  todos,
  filteredTodos,
  handleReset,
  handleClearCompleted,
  activeTab,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {todos.filter(elem => !elem.completed).length}
      {' '}
items left
    </span>

    <ul className="filters">
      <li onClick={handleReset}>
        <a href="#/" className={!activeTab ? 'selected' : ''}>
          All
        </a>
      </li>

      <li onClick={filteredTodos}>
        <a href="#/active" className={activeTab === 'active' ? 'selected' : ''}>
          Active
        </a>
      </li>

      <li onClick={filteredTodos}>
        <a
          href="#/completed"
          className={activeTab === 'completed' ? 'selected' : ''}
        >
          Completed
        </a>
      </li>
    </ul>

    {todos.filter(todo => todo.completed).length > 0 && (
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
