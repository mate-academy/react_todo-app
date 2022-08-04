import React from 'react';
import { NavLink } from 'react-router-dom';

type ActiveLink = (isActive: { isActive: boolean }) => string;

export const TodosFilter: React.FC = () => {
  const activeLink: ActiveLink = ({ isActive }) => (isActive ? 'selected' : '');

  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={activeLink}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={activeLink}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={activeLink}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
