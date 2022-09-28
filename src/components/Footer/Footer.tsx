import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  getActiveTodosCount: () => number,
  findCompleted : () => boolean,
  clearCompleted: () => void,
};

export const Footer: React.FC<Props> = ({
  getActiveTodosCount,
  findCompleted,
  clearCompleted,
}) => {
  return (
    <>
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {getActiveTodosCount()}
          {' '}
          items left
        </span>

        <ul className="filters">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => classNames(
                { selected: isActive },
              )}
            >
              All
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/active"
              className={({ isActive }) => classNames(
                { selected: isActive },
              )}
            >
              Active
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/completed"
              className={({ isActive }) => classNames(
                { selected: isActive },
              )}
            >
              Completed
            </NavLink>
          </li>

        </ul>

        {findCompleted() && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    </>

  );
};
