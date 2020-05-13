import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Footer = ({
  filter,
  setFilter,
  clearCompleted,
  itemsLeft,
  clearVisibleButton,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {`${itemsLeft} items left`}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          name="All"
          className={classNames({ selected: filter === 'All' })}
          onClick={event => setFilter(event.target.name)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/"
          name="Active"
          className={classNames({ selected: filter === 'Active' })}
          onClick={event => setFilter(event.target.name)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/"
          name="Completed"
          className={classNames({ selected: filter === 'Completed' })}
          onClick={event => setFilter(event.target.name)}
        >
          Completed
        </a>
      </li>
    </ul>

    {clearVisibleButton && (
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    )}
  </footer>
);

Footer.propTypes = {
  itemsLeft: PropTypes.number.isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  clearVisibleButton: PropTypes.bool.isRequired,
};

export default Footer;
