import React from 'react';
import PropTypes from 'prop-types';

export const Footer = (
  { countCompleted,
    handleTypeOfFilter },
) => (
  <footer className="footer">
    <span className="todo-count">
      {countCompleted}
      {' '}
      items left
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className="selected"
          onClick={() => handleTypeOfFilter('all')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => handleTypeOfFilter('active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => handleTypeOfFilter('completed')}
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
  countCompleted: PropTypes.number.isRequired,
  handleTypeOfFilter: PropTypes.func.isRequired,
};
