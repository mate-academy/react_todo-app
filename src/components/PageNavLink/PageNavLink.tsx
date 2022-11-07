import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) => classnames(
      { selected: isActive },
    )}
  >
    {text}
  </NavLink>
);
