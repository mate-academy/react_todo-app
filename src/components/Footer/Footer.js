import React from 'react';

const Footer = ({ handleFilter, activeFilter, filtered, todosList, clearCompleted }) => {
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
            onClick={() => handleFilter('all')}
            className={activeFilter === 'all' ? 'selected' : ''}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={() => handleFilter('active')}
            className={activeFilter === 'active' ? 'selected' : ''}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={() => handleFilter('completed')}
            className={activeFilter === 'completed' ? 'selected' : ''}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
        style={{ display: 'block' }}
      />
    </footer>
  );
};

export default Footer;
