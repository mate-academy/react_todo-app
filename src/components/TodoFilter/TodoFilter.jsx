import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const TodoFilter = ({ handleFilter, filter, filters }) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        onClick={() => handleFilter(filters.all)}
        className={cn({ 'selected': filter === filters.all })}
      >
        All
      </button>
    </li>

    <li>
      <button
        type="button"
        onClick={() => handleFilter(filters.active)}
        className={cn({ 'selected': filter === filters.active })}
      >
        Active
      </button>
    </li>

    <li>
      <button
        type="button"
        onClick={() => handleFilter(filters.completed)}
        className={cn({ 'selected': filter === filters.completed })}
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
