import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    data-cy="FilterLinkAll"
    end
    to={to}
    className={({ isActive }) => classNames('filter__link', {
      selected: isActive,
    })}
  >
    {text}
  </NavLink>
);

export const Filter: React.FC = () => (
  <nav className="filter" data-cy="Filter">

    <PageNavLink to="/" text="All" />

    <PageNavLink to="/active" text="Active" />

    <PageNavLink to="/completed" text="Completed" />
  </nav>
);
