import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ noComlpetedTodo, onFilteredTodos }) => (
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
    <button type="button" className="clear-completed">
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  noComlpetedTodo: PropTypes.number.isRequired,
  onFilteredTodos: PropTypes.func.isRequired,
};

export default Footer;
