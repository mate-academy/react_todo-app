import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

export const FilterList = ({ selectFilter, activeFilter }) => {
  const filters = ['All', 'Active', 'Completed'];

  return (
    <ul className="filters">
      {filters.map(filter => (
        <li key={filter}>
          <button
            type="button"
            name={filter}
            className={
              classNames({ selected: filter === activeFilter })
            }
            onClick={event => selectFilter(event.target.name)}
          >
            {filter}
          </button>
        </li>
      ))}
    </ul>
  );
};

FilterList.propTypes = {
  selectFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};
