import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  quantity: number,
  hasCompleted: boolean,
  onClearCompleted: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  quantity, onClearCompleted, hasCompleted,
}) => {
  const location = useLocation();

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${quantity} items left`}
      </span>

      <ul className="filters">
        <li>
          <Link
            to="/"
            className={classNames({
              selected: location.pathname === '/',
            })}
          >
            All
          </Link>
        </li>

        <li>
          <Link
            to="/active"
            className={classNames({
              selected: location.pathname === '/active',
            })}
          >
            Active
          </Link>
        </li>

        <li>
          <Link
            to="/completed"
            className={classNames({
              selected: location.pathname === '/completed',
            })}
          >
            Completed
          </Link>
        </li>
      </ul>

      {hasCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => onClearCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
