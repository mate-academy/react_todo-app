import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ handleClick, children, selectedFilter }) => (
  <li>
    <a
      href={`#/${children === 'All' ? '' : children.toLowerCase()}`}
      className={selectedFilter === children ? 'selected' : ''}
      onClick={handleClick}
    >
      {children}
    </a>
  </li>
);

Filter.propTypes = {
  children: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

export default Filter;
