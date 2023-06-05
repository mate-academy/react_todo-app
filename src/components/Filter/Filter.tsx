import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Filter: React.FC = React.memo(() => {
  return (
    <nav className="filter">
      <NavLink
        to="/"
        className={({ isActive }) => classNames('filter__link', {
          selected: isActive,
        })}
      >
        All
      </NavLink>

      <NavLink
        to="/active"
        className={({ isActive }) => classNames('filter__link', {
          selected: isActive,
        })}
      >
        Active
      </NavLink>

      <NavLink
        to="/completed"
        className={({ isActive }) => classNames('filter__link', {
          selected: isActive,
        })}
      >
        Completed
      </NavLink>
    </nav>
  );
});
