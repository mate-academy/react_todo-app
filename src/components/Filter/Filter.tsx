import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Filter: React.FC = () => {
  type Status = { isActive: boolean };

  const getActiveClass = (status: Status) => classNames(
    { selected: status.isActive },
  );

  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={getActiveClass}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={getActiveClass}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={getActiveClass}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
