import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useMyContext } from '../TodosContext';

export const Footer = () => {
  const { left, complited, clearCompleted } = useMyContext();
  const getSelected = ({ isActive }: { isActive: boolean }) => {
    return classNames({ selected: isActive });
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${left()} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink to="/" className={getSelected}>All</NavLink>
        </li>

        <li>
          <NavLink to="/active" className={getSelected}>Active</NavLink>
        </li>

        <li>
          <NavLink to="/completed" className={getSelected}>Completed</NavLink>
        </li>
      </ul>

      {complited() > 0 && (
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
};
