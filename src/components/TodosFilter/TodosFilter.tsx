import { NavLink } from 'react-router-dom';

type Props = {
  countNoCompletedTodos: number
  clearCompletedTodos: () => void,
  isClearBtn:boolean,
};

export const TodosFilter: React.FC<Props> = ({
  countNoCompletedTodos,
  clearCompletedTodos,
  isClearBtn,
}) => {
  type Link = {
    isActive: boolean,
  };

  const activeLink = ({ isActive }: Link) => (isActive ? 'selected' : '');

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countNoCompletedTodos} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            className={activeLink}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/active"
            className={activeLink}
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/completed"
            className={activeLink}
          >
            Completed
          </NavLink>
        </li>
      </ul>
      {isClearBtn && (
        <button
          onClick={clearCompletedTodos}
          type="button"
          className="clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
