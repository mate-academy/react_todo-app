import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  children: string,
};

export const FilterBar: React.FC<Props> = ({ to, children }) => {
  return (
    <NavLink
      data-cy="FilterLinkAll"
      to={to}
      className={({ isActive }) => classNames(
        'filter__link',
        {
          selected: isActive,
        },
      )}
    >
      {children}
    </NavLink>
  );
};
