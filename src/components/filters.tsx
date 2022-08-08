import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { FilterBy } from '../types/FilterBy';

type Status = { isActive: boolean };

const getActiveClasses = (status: Status) => classNames(
  { selected: status.isActive },
);

export const Filters = () => (
  <ul className="filters">
    <li>
      <NavLink
        to="/"
        className={getActiveClasses}
      >
        All
      </NavLink>
    </li>

    <li>
      <NavLink
        to={`/${FilterBy.Active}`}
        className={getActiveClasses}
      >
        Active
      </NavLink>
    </li>

    <li>
      <NavLink
        to={`/${FilterBy.Completed}`}
        className={getActiveClasses}
      >
        Completed
      </NavLink>
    </li>
  </ul>
);
