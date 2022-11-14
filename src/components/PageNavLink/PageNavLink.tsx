import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      data-cy={`FilterLink${text}`}
      to={to}
      className={
        ({ isActive }) => classNames('filter__link',
          { selected: isActive })
      }
    >
      {text}
    </NavLink>
  );
};
