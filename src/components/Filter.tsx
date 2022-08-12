import React from 'react';
import { NavLink } from 'react-router-dom';

type Link = {
  isActive: boolean,
};

export const Filter: React.FC = () => {
  const activeLink = ({ isActive }: Link) => {
    return isActive ? 'selected' : '';
  };

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
