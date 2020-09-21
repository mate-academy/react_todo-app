import React from 'react';
import PropTypes from 'prop-types';

export function TodosFilter({ filter, setFilter, FILTERS }) {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filter === FILTERS.all ? 'selected' : ''}
          onClick={() => setFilter(FILTERS.all)}
        >
          {FILTERS.all}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filter === FILTERS.active ? 'selected' : ''}
          onClick={() => setFilter(FILTERS.active)}
        >
          {FILTERS.active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filter === FILTERS.completed ? 'selected' : ''}
          onClick={() => setFilter(FILTERS.completed)}
        >
          {FILTERS.completed}
        </a>
      </li>
    </ul>
  );
}

TodosFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  FILTERS: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};
