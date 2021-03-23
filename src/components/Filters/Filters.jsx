import React from 'react';
import { NavLink } from 'react-router-dom';

export const Filters = () => (
  <ul className="filters">
    <li>
      <NavLink
        exact
        to="/"
        activeClassName="selected"
      >
        All
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/active"
        activeClassName="selected"
      >
        Active
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/completed"
        activeClassName="selected"
      >
        Completed
      </NavLink>
    </li>
  </ul>

);
