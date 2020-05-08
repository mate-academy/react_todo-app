import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './FilterList.scss';
import { FILTER_TYPES } from '../../constants';

export const FilterList = ({ onFilter, selectedFilter }) => (
  <ul className="filters">
    {Object.values(FILTER_TYPES).map(filter => (
      <li key={filter} className="filter">
        <a
          href={`#/${filter}`}
          className={cn('filter-link', {
            selected: selectedFilter === filter,
          })}
          onClick={() => onFilter(filter)}
        >
          {filter}
        </a>
      </li>
    ))}
  </ul>
);

FilterList.propTypes = {
  onFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};
