import { NavLink } from 'react-router-dom';

import React from 'react';

const FILTERS = {
  all: '/',
  active: '/active',
  completed: '/completed',
};

export const TodosFilter = () => (
  <ul className="filters">
    <li
      key="all"
    >
      <NavLink
        exact
        to={{
          pathname: FILTERS.all,
        }}
        activeClassName="selected"
      >
        All
      </NavLink>
    </li>

    <li
      key="active"
    >
      <NavLink
        exact
        to={{
          pathname: FILTERS.active,
        }}
        activeClassName="selected"
      >
        active
      </NavLink>
    </li>

    <li
      key="completed"
    >
      <NavLink
        exact
        to={{
          pathname: FILTERS.completed,
        }}
        activeClassName="selected"
      >
        Completed
      </NavLink>
    </li>
  </ul>
);
