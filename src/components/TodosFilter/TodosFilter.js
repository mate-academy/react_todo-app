import React from 'react';
import PropTypes from 'prop-types';
import { FilterItem } from '../FilterItem/FilterItem';

export const TodosFilter = ({ handleFilterStatusChange, activeFilter }) => {
  const filterStatusItems = ['all', 'active', 'completed'];

  return (
    <ul className="filters">
      {filterStatusItems.map(item => (
        <li key={item}>
          <FilterItem
            filterValue={item}
            handleFilterStatusChange={handleFilterStatusChange}
            activeFilter={activeFilter}
          />
        </li>
      ))}
    </ul>
  );
};

TodosFilter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  handleFilterStatusChange: PropTypes.func.isRequired,
};
