import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const TodoFilter = ({ handleFilter, filter }) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        onClick={() => handleFilter('All')}
        className={cn({ selected: filter === 'All' })}
      >
        All
      </button>
    </li>

    <li>
      <button
        type="button"
        onClick={() => handleFilter('Active')}
        className={cn({ selected: filter === 'Active' })}
      >
        Active
      </button>
    </li>

    <li>
      <button
        type="button"
        onClick={() => handleFilter('Completed')}
        className={cn({ selected: filter === 'Completed' })}
      >
        Completed
      </button>
    </li>
  </ul>
);

TodoFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
