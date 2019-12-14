import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { filterTypes } from '../../App';

const TodoFilters = ({ onFilter, selectedFilter }) => (
  <ul className="filters">
    {Object.values(filterTypes).map(filter => (
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

TodoFilters.propTypes = {
  onFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

export default TodoFilters;
