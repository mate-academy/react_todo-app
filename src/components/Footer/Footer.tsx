import { Link } from 'react-router-dom';

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
          <Link to="/" className="selected">
            All
          </Link>
        </li>

        <li>
          <Link to="/active">
            Active
          </Link>
        </li>

        <li>
          <Link to="/completed">
            Completed
          </Link>
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
