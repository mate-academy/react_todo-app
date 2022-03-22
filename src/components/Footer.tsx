import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  clearCompleted: () => void
  activeTodosLength: number
  completedTodosLength: number
};

const Footer: React.FC<Props> = ({ clearCompleted, activeTodosLength, completedTodosLength }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${activeTodosLength} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/active"
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            Active
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/completed"
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            Completed
          </NavLink>
        </li>
      </ul>

      {completedTodosLength > 0 && (
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

export default Footer;
