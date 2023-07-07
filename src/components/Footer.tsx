import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Filter } from '../utils/enums';

type Props = {
  numberOfTodos: number | undefined;
  hasCompletedTodos: boolean;
  onRemove(): void;
};

export const Footer: React.FC<Props> = ({
  numberOfTodos,
  hasCompletedTodos,
  onRemove,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {numberOfTodos === 1 ? (
          `${numberOfTodos} item left`
        ) : (
          `${numberOfTodos} items left`
        )}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to={`/${Filter.All}`}
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
            to={`/${Filter.Active}`}
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
            to={`/${Filter.Completed}`}
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

      {hasCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={onRemove}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
