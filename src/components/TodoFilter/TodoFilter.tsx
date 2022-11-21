import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  active: number;
  completed: number;
  clearCompleted: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  active,
  clearCompleted,
  completed,
}) => (
  <footer className="footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${active} items left`}
    </span>

    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => classNames({ selected: isActive })}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={({ isActive }) => classNames({ selected: isActive })}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={({ isActive }) => classNames({ selected: isActive })}
        >
          Completed
        </NavLink>
      </li>
    </ul>

    {completed > 0 && (
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    )}
  </footer>
);
