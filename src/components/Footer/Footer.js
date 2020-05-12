import React from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';

export const Footer = (
  { invisibleFooter,
    countCompleted,
    handleTypeOfFilter,
    typeOfFilter,
    clearCompleted },
) => (
  <footer className={CN({
    'footer-invisible': !invisibleFooter,
    footer: true,
  })}
  >
    <span className="todo-count">
      {countCompleted}
      {' '}
      items left
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={() => handleTypeOfFilter('all')}
          className={CN({ selected: typeOfFilter === 'all' })}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => handleTypeOfFilter('active')}
          className={CN({ selected: typeOfFilter === 'active' })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => handleTypeOfFilter('completed')}
          className={CN({ selected: typeOfFilter === 'completed' })}
        >
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      onClick={() => clearCompleted()}
    >
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  invisibleFooter: PropTypes.number.isRequired,
  countCompleted: PropTypes.number.isRequired,
  handleTypeOfFilter: PropTypes.func.isRequired,
  typeOfFilter: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
