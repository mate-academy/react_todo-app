import React from 'react';

const Footer = ({allTodosClick, activeClick, completedClick, todos, clearCompleted, indexTab}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {todos.filter(todo => !todo.completed).length}
      {' '}
              items left
    </span>

    <ul className="filters">
      <li onClick={allTodosClick}>
        <a href="#/" className={!indexTab ? 'selected' : ''}>
            All
        </a>
      </li>

      <li onClick={activeClick}>
        <a href="#/active" className={indexTab === 'active' ? 'selected' : ''}>Active</a>
      </li>

      <li onClick={completedClick}>
        <a href="#/completed" className={indexTab === 'completed' ? 'selected' : ''}>Completed</a>
      </li>
    </ul>

    {todos.filter(todo => todo.completed).length > 0 && (
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
          Clear completed
      </button>
    )}
  </footer>
);

export default Footer;
