import React from 'react';
import { NavLink } from 'react-router-dom';

export function TodoFooter({ todosLeft }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${todosLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            exact
            activeClassName="selected"
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/active"
            activeClassName="selected"
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/completed"
            activeClassName="selected"
          >
            Completed
          </NavLink>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}
