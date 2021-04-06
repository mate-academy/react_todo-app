import React from 'react';
import PropTypes from 'prop-types';

export const TodoFilter = ({ setFilter, filter }) => {
  const filterHandler = filterBy => (
    setFilter(filterBy)
  );

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filter === 'all' ? 'selected' : ''}
          onClick={() => filterHandler('all')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => filterHandler('active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => filterHandler('completed')}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodoFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
