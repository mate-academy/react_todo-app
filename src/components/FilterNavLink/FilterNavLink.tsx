import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  title: string,
};

export const FilterNavLink: React.FC <Props> = ({
  to,
  title,
}) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => classNames({ selected: isActive })}
      >
        {title}
      </NavLink>
    </li>
  );
};
