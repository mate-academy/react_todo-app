import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FILTERS } from '../../api/constant';

export const Filter = ({ onFilterSet }) => (
  <ul className="filters">
    <li>
      <NavLink
        to="/"
        exact
        activeClassName="selected"
        onClick={() => onFilterSet(FILTERS.all)}
      >
        All
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/active"
        exact
        activeClassName="selected"
        onClick={() => onFilterSet(FILTERS.active)}
      >
        Active
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/completed"
        exact
        activeClassName="selected"
        onClick={() => onFilterSet(FILTERS.completed)}
      >
        Completed
      </NavLink>
    </li>
  </ul>
);

Filter.propTypes = {
  onFilterSet: PropTypes.func.isRequired,
};
