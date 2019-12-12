import React from 'react';
import PropTypes from 'prop-types';

const TodosFilters = ({ filters, onFiltered, selectedFilter }) => (
  <ul className="filters">
    {filters.map(filter => (
      <li key={filter}>
        <a
          href={`#/${filter}`}
          className={selectedFilter === filter ? 'selected' : ''}
          onClick={() => onFiltered(filter)}
        >
          {filter}
        </a>
      </li>
    ))}
  </ul>
);

TodosFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFiltered: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

export default TodosFilters;
