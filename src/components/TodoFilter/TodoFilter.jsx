import React from 'react';
import PropTypes from 'prop-types';

export const TodoFilter = ({ filterChange }) => {
  const handleClick = (filter) => {
    filterChange(filter);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className=""
          onClick={() => handleClick('All')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className=""
          onClick={() => handleClick('Active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className="selected"
          onClick={() => handleClick('Completed')}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodoFilter.propTypes = {
  filterChange: PropTypes.func.isRequired,
};
