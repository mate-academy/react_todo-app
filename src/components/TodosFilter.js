import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodosFilter
= (
  { handleFilter, handleFilterAll, isAllSelected,
    isActiveSelected, isCompletedSelected },
) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        className={classNames({ selected: isAllSelected })}
        onClick={handleFilterAll}
      >
        All
      </button>
    </li>

    <li>
      <button
        type="button"
        className={classNames({ selected: isActiveSelected })}
        onClick={event => handleFilter(todo => !todo.completed, event)}
      >
        Active
      </button>
    </li>

    <li>
      <button
        type="button"
        className={classNames({ selected: isCompletedSelected })}
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
