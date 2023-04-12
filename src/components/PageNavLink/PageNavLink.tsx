import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type PageNavLinkProps = {
  text: string,
  to: string,
};

export const PageNavLink: React.FC<PageNavLinkProps> = ({
  text,
  to,
}) => (
  <NavLink
    to={to}
    className={(({ isActive }) => classNames({ selected: isActive }))}
  >
    {text}
  </NavLink>
);
