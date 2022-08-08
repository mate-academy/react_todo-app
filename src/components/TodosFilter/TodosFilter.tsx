import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const TodosFilter: React.FC = () => {
  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => classNames(
            isActive ? 'selected' : '',
          )}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={({ isActive }) => classNames(
            isActive ? 'selected' : '',
          )}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={({ isActive }) => classNames(
            isActive ? 'selected' : '',
          )}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
