import React from 'react';
import { NavLink } from 'react-router-dom';

const FILTERS = ['All', 'Active', 'Completed'];

export const TodosFilter = () => (
  <ul className="filters">
    {FILTERS.map(filter => (
      <li key={filter}>
        <NavLink
          to={filter === 'All' ? '/' : `/${filter.toLowerCase()}`}
          exact
          activeClassName="selected"
        >
          {filter}
        </NavLink>
      </li>
    ))}
  </ul>
);
