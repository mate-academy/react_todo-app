import React from 'react';
import PropTypes from 'prop-types';

export const TodosFilter = ({ handleFilter, selectedFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={selectedFilter === 'all' ? 'selected' : ''}
        onClick={() => handleFilter('all')}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={selectedFilter === 'active' ? 'selected' : ''}
        onClick={() => handleFilter('active')}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={selectedFilter === 'completed' ? 'selected' : ''}
        onClick={() => handleFilter('completed')}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};
