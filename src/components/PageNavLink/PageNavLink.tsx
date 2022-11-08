import classnames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = React.memo(({ to, text }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) => classnames(
      { selected: isActive },
    )}
  >
    {text}
  </NavLink>
));
