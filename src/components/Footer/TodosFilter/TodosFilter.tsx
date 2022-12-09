import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const TodosFilter: React.FC = React.memo(() => {
  const isActiveLink = ({ isActive }: { isActive: boolean }) => {
    return classNames('filter__link', { selected: isActive });
  };

  return (
    <nav className="filter" data-cy="todosFilter">
      <NavLink
        data-cy="FilterLinkAll"
        to="/"
        className={isActiveLink}
      >
        All
      </NavLink>

      <NavLink
        data-cy="FilterLinkActive"
        to="../active"
        className={isActiveLink}
      >
        Active
      </NavLink>

      <NavLink
        data-cy="FilterLinkCompleted"
        to="../completed"
        className={isActiveLink}
      >
        Completed
      </NavLink>
    </nav>
  );
});
