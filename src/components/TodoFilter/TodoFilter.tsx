import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  deleteCompleted: () => void,
  activeTodos: Todo[],
  onClear: Todo[],
};

export const TodoFilter: React.FC<Props> = ({
  deleteCompleted,
  activeTodos,
  onClear: completedTodos,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => classNames(
              {
                selected: isActive,
              },
            )}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/active"
            className={({ isActive }) => classNames(
              {
                selected: isActive,
              },
            )}
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/completed"
            className={({ isActive }) => classNames(
              {
                selected: isActive,
              },
            )}
          >
            Completed
          </NavLink>
        </li>
      </ul>

      {completedTodos.length && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => deleteCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
