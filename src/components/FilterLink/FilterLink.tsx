import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  text: string;
  to: string;
};

export const FilterLink = React.memo<Props>(({ text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames({ selected: isActive })}
    >
      {text}
    </NavLink>
  );
});
