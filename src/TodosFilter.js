import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Filter = ({ handleClick, children, selectedFilter }) => (
  <li>
    <a
      href={`#/${selectedFilter === 'all' ? '' : selectedFilter}`}
      className={cn({ selected: selectedFilter === children.toLowerCase() })}
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
