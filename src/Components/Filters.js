import React from 'react';
import PropsTypes from 'prop-types';
import cn from 'classnames';

const Filters = ({ selectFilter, handleFilter }) => {
  const FILTER_TYPES = {
    all: 'all',
    active: 'active',
    completed: 'completed',
  };

  return (
    Object.keys(FILTER_TYPES).map(filter => (
      <li key={filter}>
        <a
          href="#/"
          className={cn({ selected: selectFilter === filter })}
          onClick={() => handleFilter(filter)}
        >
          {filter}
        </a>
      </li>
    ))
  );
};

Filters.propTypes = {
  handleFilter: PropsTypes.func.isRequired,
};

export default Filters;
