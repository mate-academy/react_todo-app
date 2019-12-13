import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FILTER_TYPES } from '../App';

const TodosFilters = ({ onFilter, selectedFilter }) => (
  <ul className={cn('filters')}>
    {Object.values(FILTER_TYPES).map(filter => (
      <li key={filter}>
        <a
          href={`#/${filter}`}
          className={cn(selectedFilter === filter && 'selected')}
          onClick={() => onFilter(filter)}
        >
          {filter}
        </a>
      </li>
    ))}
  </ul>
);

TodosFilters.propTypes = {
  onFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

export default TodosFilters;
