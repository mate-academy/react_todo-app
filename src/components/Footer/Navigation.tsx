import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => (
  <nav className="filter" data-cy="todosFilter">
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
      to="../active"
      className={({ isActive }) => classNames('filter__link', {
        selected: isActive,
      })}
    >
      Active
    </NavLink>
    <NavLink
      data-cy="FilterLinkCompleted"
      to="../completed"
      className={({ isActive }) => classNames('filter__link', {
        selected: isActive,
      })}
    >
      Completed
    </NavLink>
  </nav>
);
