import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

type Props = {
  to: string;
  text: string;
};

export const FilterNavLink:React.FC<Props> = ({
  to,
  text,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames({ selected: isActive })}
    >
      {text}
    </NavLink>
  );
};
