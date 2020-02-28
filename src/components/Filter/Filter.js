import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ handleFilterClick }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className="selected"
        name="all"
        onClick={handleFilterClick}
      >
            All
      </a>
    </li>
    <li>
      <a
        href="#/active"
        name="active"
        onClick={handleFilterClick}
      >
            Active
      </a>
    </li>
    <li>
      <a
        href="#/completed"
        name="completed"
        onClick={handleFilterClick}
      >
            Completed
      </a>
    </li>
  </ul>

);

Filter.propTypes = {
  handleFilterClick: PropTypes.func.isRequired,
};

export default Filter;
