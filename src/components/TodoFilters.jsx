import React from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from './constants';

export const TodoFilters = ({ setFilter, filter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={filter === FILTERS.all ? 'selected' : ''}
        onClick={() => setFilter(FILTERS.all)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={filter === FILTERS.active ? 'selected' : ''}
        onClick={() => setFilter(FILTERS.active)}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={filter === FILTERS.completed ? 'selected' : ''}
        onClick={() => setFilter(FILTERS.completed)}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodoFilters.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
