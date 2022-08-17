import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  getActiveTodosCount: () => void;
  clearCompletedTodos: () => void;
};

export const Footer: React.FC<Props> = ({
  getActiveTodosCount,
  clearCompletedTodos,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${getActiveTodosCount()} items left`}
      </span>

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

      <button
        type="button"
        className="clear-completed"
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
