import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const FilterLink: FC<{ to: string; title: string }> = ({
  to,
  title,
}) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => classNames({ selected: isActive })}
    >
      {title}
    </NavLink>
  </li>
);
