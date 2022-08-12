import { NavLink } from 'react-router-dom';

export const TodoFilter: React.FC = () => {
  const styleActiveLink = (isActive: boolean) => (
    isActive ? 'selected' : ''
  );

  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => styleActiveLink(isActive)}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={({ isActive }) => styleActiveLink(isActive)}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={({ isActive }) => styleActiveLink(isActive)}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
