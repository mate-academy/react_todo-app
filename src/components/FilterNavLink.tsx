import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
};

export const FilterNavLink:React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames({ selected: isActive })}
    >
      {text}
    </NavLink>
  );
};

export default FilterNavLink;
