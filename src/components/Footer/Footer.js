import React from 'react';

const Footer = ({
  todos,
  filterAll,
  filterActive,
  filterCompleted,
  activeTab,
  clearAllCompleted,
}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {todos.filter(elem => elem.completed === false).length}
      {' '}
items left
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={activeTab === 'all' && 'selected'}
          onClick={filterAll}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={activeTab === 'active' && 'selected'}
          onClick={filterActive}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={activeTab === 'completed' && 'selected'}
          onClick={filterCompleted}
        >
          Completed
        </a>
      </li>
    </ul>
    {todos.filter(elem => elem.completed === true).length > 0 && (
      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        onClick={clearAllCompleted}
      >
        Clear all completed
      </button>
    )}
  </footer>
);

export default Footer;
