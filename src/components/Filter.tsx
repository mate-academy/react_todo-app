import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Sort } from '../types/Sort';

export const Filter = () => {
  return (
    <nav className="filter">
      <NavLink
        to={`/${Sort.All}`}
        className={({ isActive }) => classNames(
          'filter__link',
          { selected: isActive },
        )}
      >
        All
      </NavLink>

      <NavLink
        to={`/${Sort.Active}`}
        className={({ isActive }) => classNames(
          'filter__link',
          { selected: isActive },
        )}
      >
        Active
      </NavLink>

      <NavLink
        to={`/${Sort.Completed}`}
        className={({ isActive }) => classNames(
          'filter__link',
          { selected: isActive },
        )}
      >
        Completed
      </NavLink>
    </nav>
  );
};
