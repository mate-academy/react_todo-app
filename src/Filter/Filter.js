import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Filter = ({ length, filter, filterState, clearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">
      {length}
      {' '}
active todos
    </span>
    <ul className="filters">
      <li>
        <button
          type="button"
          className={cn({ selected: filterState === 'All' })}
          onClick={() => filter('All')}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={cn({ selected: filterState === 'Active' })}
          type="button"
          onClick={() => filter('Active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={cn({ selected: filterState === 'Completed' })}
          type="button"
          onClick={() => filter('Completed')}
        >
          Completed
        </button>
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

Filter.propTypes = {
  length: PropTypes.number.isRequired,
  filter: PropTypes.func.isRequired,
  filterState: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
