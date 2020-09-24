import React from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants';

export const TodoFilters = ({ currentFilter, getFilter }) => (
  <ul className="filters">
    {Object.values(FILTERS).map(filter => (
      <li key={filter}>
        <a
          href={currentFilter === FILTERS.all
            ? `#/`
            : `#/${currentFilter.toLowerCase()}`}
          className={currentFilter === filter ? 'selected' : ''}
          onClick={() => getFilter(filter)}
        >
          {filter}
        </a>
      </li>
    ))}
  </ul>
);

TodoFilters.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  getFilter: PropTypes.func.isRequired,
};
