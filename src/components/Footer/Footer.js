import React from 'react';

const Footer = ({ filteredCompleted, filteredActive, filteredAll, activeFilter, todosList }) => {
  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        {todosList.filter(todo => !todo.completed).length}
        :items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/all"
            onClick={filteredAll}
            className={activeFilter === 'all' ? 'selected' : ''}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={filteredActive}
            className={activeFilter === 'active' ? 'selected' : ''}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={filteredCompleted}
            className={activeFilter === 'completed' ? 'selected' : ''}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
      />
    </footer>
  );
};

export default Footer;
