import { memo } from 'react';
import { NavLink } from 'react-router-dom';

export const TodoFilter = memo(() => {
  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (
            isActive ? 'selected' : undefined
          )}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={({ isActive }) => (
            isActive ? 'selected' : undefined
          )}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={({ isActive }) => (
            isActive ? 'selected' : undefined
          )}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
});
