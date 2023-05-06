import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = { to: string; title: string };

export const FilterLink: FC<Props> = ({ to, title }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => classNames({ selected: isActive })}
    >
      {title}
    </NavLink>
  </li>
);
