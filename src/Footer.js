import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ todos, clearCompleted, setFilter }) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
        items left
      {' '}
      {todos.filter(item => !item.completed).length}

    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className="selected"
          onClick={() => setFilter('All')}
        >
            All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => setFilter('Active')}
        >
            Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => setFilter('Completed')}
        >
            Completed
        </a>
      </li>

    </ul>

    {todos.some(item => item.completed) && (
      <button
        type="button"
        className="clear-completed"
        onClick={() => clearCompleted()}
        style={{ display: 'block' }
        }
      >
        {' '}
Clear completed
        {' '}
      </button>
    )}

  </footer>
);

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearCompleted: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};
export default Footer;
