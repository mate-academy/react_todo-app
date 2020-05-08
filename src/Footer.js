import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({
  noComlpetedTodo,
  onFilteredTodos,
  clearCompleted,
  visibleClearCompleted,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {noComlpetedTodo}
      {' '}
      items left
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={e => onFilteredTodos(e.target.text)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={e => onFilteredTodos(e.target.text)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={e => onFilteredTodos(e.target.text)}
        >
          Completed
        </a>
      </li>
    </ul>
    {visibleClearCompleted
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )
    }
  </footer>
);

Footer.propTypes = {
  noComlpetedTodo: PropTypes.number.isRequired,
  onFilteredTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  visibleClearCompleted: PropTypes.bool.isRequired,
};

export default Footer;
