import React from 'react';
import { NavLink } from 'react-router-dom';

export const TodosFilter: React.FC = () => {
  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
