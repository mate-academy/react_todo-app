import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filterName, filter, currentFilter }) => (
  <li>
    <a
      href="#/"
      onClick={() => filter(filterName)}
      className={filterName === currentFilter ? 'selected' : ''}
    >
      {filterName}
    </a>
  </li>
);

Filter.propTypes = {
  filterName: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export default Filter;
