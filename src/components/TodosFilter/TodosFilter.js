import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FILTERS } from '../../api/constant';

export const TodosFilter = ({ setFilter }) => (
  <ul className="filters">
    <li>
      <NavLink
        to="/"
        exact
        activeClassName="selected"
        onClick={() => setFilter(FILTERS.all)}
      >
        All
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/active"
        exact
        activeClassName="selected"
        onClick={() => setFilter(FILTERS.active)}
      >
        Active
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/completed"
        exact
        activeClassName="selected"
        onClick={() => setFilter(FILTERS.completed)}
      >
        Completed
      </NavLink>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
