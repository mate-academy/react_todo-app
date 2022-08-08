import { NavLink } from 'react-router-dom';
import { Status } from '../Types/Status';
import { Todo } from '../Types/Todo';

type Props = {
  todos: Todo[],
  setSortBy: (value: Status) => void,
  clearCompleted: () => void,
};

type ActiveLink = (isActive: { isActive: boolean }) => string;

export const Footer: React.FC<Props> = ({
  todos,
  setSortBy,
  clearCompleted,
}) => {
  const activeLink: ActiveLink = ({ isActive }) => (isActive ? 'selected' : '');

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            className={activeLink}
            onClick={() => {
              setSortBy(Status.All);
            }}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/active"
            className={activeLink}
            onClick={() => {
              setSortBy(Status.Active);
            }}
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/completed"
            className={activeLink}
            onClick={() => {
              setSortBy(Status.Completed);
            }}
          >
            Completed
          </NavLink>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={() => clearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
