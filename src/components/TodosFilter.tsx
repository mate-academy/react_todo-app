import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const TodosFilter: React.FC = () => {
  return (
    <nav className="filter">
      <NavLink
        to="/"
        className={({ isActive }) => classNames(
          'filter__link',
          { selected: isActive },
        )}
      >
        All
      </NavLink>

      <NavLink
        to="/active"
        className={({ isActive }) => classNames(
          'filter__link',
          { selected: isActive },
        )}
      >
        Active
      </NavLink>

      <NavLink
        to="/completed"
        className={({ isActive }) => classNames(
          'filter__link',
          { selected: isActive },
        )}
      >
        Completed
      </NavLink>
    </nav>
  );
};
