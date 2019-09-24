import React from 'react';

import PropTypes from 'prop-types';

const TodoFilter = ({
  toggleFilters,
  activeFilter,
}) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={activeFilter === 'All' ? 'selected' : ''}
        onClick={() => toggleFilters('All')}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={activeFilter === 'Active' ? 'selected' : ''}
        onClick={() => toggleFilters('Active')}
      >
          Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={activeFilter === 'Completed' ? 'selected' : ''}
        onClick={() => toggleFilters('Completed')}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodoFilter.propTypes = {
  toggleFilters: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};

export default TodoFilter;
