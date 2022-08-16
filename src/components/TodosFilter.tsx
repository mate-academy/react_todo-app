import { NavLink } from 'react-router-dom';
import { Status } from '../type/Status';

type Props = {
  setStatus: (status: Status) => void;
};

export const TodosFilter = ({ setStatus } : Props) => {
  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          onClick={() => {
            setStatus(Status.ALL);
          }}
          className={({ isActive }) => (
            isActive ? 'selected' : ''
          )}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          onClick={() => {
            setStatus(Status.ACTIVE);
          }}
          className={({ isActive }) => (
            isActive ? 'selected' : ''
          )}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          onClick={() => {
            setStatus(Status.COMPLETED);
          }}
          className={({ isActive }) => (
            isActive ? 'selected' : ''
          )}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
