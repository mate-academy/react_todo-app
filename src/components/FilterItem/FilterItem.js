import React from 'react';
import PropTypes from 'prop-types';

export const FilterItem = ({
  handleFilterStatusChange,
  activeFilter,
  filterValue,
}) => (
  <a
    href={`#/${filterValue}`}
    className={`${activeFilter === filterValue ? 'selected' : ''}`}
    onClick={() => {
      handleFilterStatusChange(filterValue);
    }}
  >
    {filterValue}
  </a>
);

FilterItem.propTypes = {
  filterValue: PropTypes.string.isRequired,
  activeFilter: PropTypes.string.isRequired,
  handleFilterStatusChange: PropTypes.func.isRequired,
};
