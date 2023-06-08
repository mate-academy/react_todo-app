import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Filter: React.FC = React.memo(() => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => classNames({
            selected: isActive,
          })}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={({ isActive }) => classNames({
            selected: isActive,
          })}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={({ isActive }) => classNames({
            selected: isActive,
          })}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
});
