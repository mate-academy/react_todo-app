import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Status } from '../types/Status';

type Props = {
  filterName: Status,
  to: string,
};

export const FilterNavLink: React.FC<Props> = ({ filterName, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames({ selected: isActive })}
    >
      {filterName}
    </NavLink>
  );
};
