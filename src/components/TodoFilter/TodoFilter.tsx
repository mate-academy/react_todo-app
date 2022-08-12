import React from 'react';
import { NavLink } from 'react-router-dom';

export const TodoFilter: React.FC = () => {
  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className="selected"
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
