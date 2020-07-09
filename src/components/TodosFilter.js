import React from 'react';
import PropTypes from 'prop-types';

export const TodosFilter
= (
  { handleFilter, handleFilterAll, isAllSelected,
    isActiveSelected, isCompletedSelected },
) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        className={isAllSelected ? 'selected' : ''}
        onClick={handleFilterAll}
      >
        All
      </button>
    </li>

    <li>
      <button
        type="button"
        className={isActiveSelected ? 'selected' : ''}
        onClick={event => handleFilter(todo => !todo.completed, event)}
      >
        Active
      </button>
    </li>

    <li>
      <button
        type="button"
        className={isCompletedSelected ? 'selected' : ''}
        onClick={event => handleFilter(todo => todo.completed, event)}
      >
        Completed
      </button>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  handleFilterAll: PropTypes.func.isRequired,
  isAllSelected: PropTypes.bool.isRequired,
  isActiveSelected: PropTypes.bool.isRequired,
  isCompletedSelected: PropTypes.bool.isRequired,
};
