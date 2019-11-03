import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({
  todos,
  handleActiveFilter,
  activeFilter,
  handleClearCompleted,
}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {todos.filter(todo => !todo.completed).length}
      {' '}
      items left
    </span>
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={activeFilter === 'all' ? 'selected' : ''}
          onClick={() => handleActiveFilter('all')}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={activeFilter === 'active' ? 'selected' : ''}
          onClick={() => handleActiveFilter('active')}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={activeFilter === 'completed' ? 'selected' : ''}
          onClick={() => handleActiveFilter('completed')}
        >
          Completed
        </a>
      </li>
    </ul>
    {todos.some(todo => todo.completed)
      && <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    }
  </footer>
);

Footer.propTypes = {
  handleActiveFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
