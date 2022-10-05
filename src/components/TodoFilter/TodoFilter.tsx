import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const TodoFilter: React.FC = () => (

  <nav className="filter" data-cy="Filter">
    <NavLink
      data-cy="FilterLinkAll"
      to="/"
      className={({ isActive }) => classNames('filter__link', {
        selected: isActive,
      })}
    >
      All
    </NavLink>

    <NavLink
      data-cy="FilterLinkActive"
      to="/active"
      className={({ isActive }) => classNames('filter__link', {
        selected: isActive,
      })}
    >
      Active
    </NavLink>
    <NavLink
      data-cy="FilterLinkCompleted"
      to="/completed"
      className={({ isActive }) => classNames('filter__link', {
        selected: isActive,
      })}
    >
      Completed
    </NavLink>
  </nav>
);
