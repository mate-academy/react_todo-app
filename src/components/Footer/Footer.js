import React from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';

export const Footer = (
  { filters,
    invisibleFooter,
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
      {Object.values(filters).map(item => (
        <li key={item}>
          <a
            href="#/"
            onClick={() => handleTypeOfFilter(item)}
            className={CN({ selected: typeOfFilter === item })}
          >
            {item}
          </a>
        </li>
      ))}
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
  filters: PropTypes.shape.isRequired,
  invisibleFooter: PropTypes.number.isRequired,
  countCompleted: PropTypes.number.isRequired,
  handleTypeOfFilter: PropTypes.func.isRequired,
  typeOfFilter: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
