import React from 'react';
import cn from 'classnames';
import { filterListType } from '../../typedefs/filterListType';
import { FILTER_TYPES } from '../../constants';
import './FilterList.scss';

export const FilterList = ({ onSetFilter, selectedFilter }) => (
  <ul className="filters">
    {Object.values(FILTER_TYPES).map(filter => (
      <li key={filter} className="filter">
        <a
          href={`#/${filter}`}
          className={cn('filter-link', {
            selected: selectedFilter === filter,
          })}
          onClick={() => onSetFilter(filter)}
        >
          {filter}
        </a>
      </li>
    ))}
  </ul>
);

FilterList.propTypes = filterListType.isRequired;
