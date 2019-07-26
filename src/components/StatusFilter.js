import React from 'react';
import PropTypes from 'prop-types';

const StatusFilter = ({ filter, onFilterChange }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={filter === 'all' ? 'selected' : ''}
        onClick={() => onFilterChange('all')}
      >
          All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={filter === 'active' ? 'selected' : ''}
        onClick={() => onFilterChange('active')}
      >
          Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={filter === 'complete' ? 'selected' : ''}
        onClick={() => onFilterChange('complete')}
      >
          Completed
      </a>
    </li>
  </ul>
);

StatusFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default StatusFilter;
