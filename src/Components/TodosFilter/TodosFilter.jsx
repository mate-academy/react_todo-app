import React from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from '../../vars';

export const TodoFilter = ({ changeFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className="selected"
        onClick={() => changeFilter(FILTERS.all)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        onClick={() => changeFilter(FILTERS.active)}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        onClick={() => changeFilter(FILTERS.completed)}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodoFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};
