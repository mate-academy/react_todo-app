import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from '../ContextProvider';

export const Footer = () => {
  const { todos, clearCompleted, notCompleted } = useContext(Context);
  const getSelected = ({ isActive }: { isActive: boolean }) => {
    return classNames({ selected: isActive });
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompleted()} items left`}
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

      {notCompleted() < todos.length && (
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
