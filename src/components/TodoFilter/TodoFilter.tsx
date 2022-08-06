import React from 'react';
import { NavLink } from 'react-router-dom';

type Status = {
  isActive: boolean,
};

export const TodoFilter: React.FC = () => {
  const selectedLink = ({ isActive }: Status) => {
    return isActive ? 'selected' : '';
  };

  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={selectedLink}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={selectedLink}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={selectedLink}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
