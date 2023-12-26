import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useMyContext } from '../TodosContext';

export const Footer = () => {
  const { left, complited, clearCompleted } = useMyContext();
  const getSelected = ({ isActive }: { isActive: boolean }) => {
    return classNames({ selected: isActive });
  };

  const itemsCall = () => {
    return (
      <span className="todo-count" data-cy="todosCounter">
        {`${left()} items left`}
      </span>
    );
  };

  const buttonCall = () => {
    const tmp = [];

    if (complited() > 0) {
      tmp.push(
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>,
      );
    }

    return tmp;
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      {itemsCall()}
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

      {buttonCall()}
    </footer>
  );
};
