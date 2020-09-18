import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const TodoFilter = ({ handleFilter, filter, FILTERS }) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        onClick={() => handleFilter(FILTERS.all)}
        className={cn({ 'selected': filter === FILTERS.all })}
      >
        All
      </button>
    </li>

    <li>
      <button
        type="button"
        onClick={() => handleFilter(FILTERS.active)}
        className={cn({ 'selected': filter === FILTERS.active })}
      >
        Active
      </button>
    </li>

    <li>
      <button
        type="button"
        onClick={() => handleFilter(FILTERS.completed)}
        className={cn({ 'selected': filter === FILTERS.completed })}
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
