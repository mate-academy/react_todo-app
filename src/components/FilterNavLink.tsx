import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string,
  title: string,
};

export const FilterNavLink: React.FC<Props> = ({ path, title }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) => classNames({ selected: isActive })}
      >
        {title}
      </NavLink>
    </li>
  );
};
