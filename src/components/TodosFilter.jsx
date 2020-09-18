import React from 'react';
import PropTypes from 'prop-types';

export const TodosFilter = ({ handleFilter, selectedFilter }) => {
  const FILTERS = { all: 'all', active: 'active', completed: 'completed' };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={selectedFilter === FILTERS.all ? 'selected' : ''}
          onClick={() => handleFilter(FILTERS.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={selectedFilter === FILTERS.active ? 'selected' : ''}
          onClick={() => handleFilter(FILTERS.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={selectedFilter === FILTERS.completed ? 'selected' : ''}
          onClick={() => handleFilter(FILTERS.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodosFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};
