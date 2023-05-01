import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  text: string,
  to: string,
};

export const PageNavLink: React.FC<Props> = ({
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
