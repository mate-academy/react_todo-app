import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

export function TodoFooter({ todos, handleClearCompleted }) {
  const activeTodos = useMemo(() => (
    todos.reduce((total, current) => (
      (current.completed) ? total : total + 1
    ), 0)
  ), [todos]);

  const completedTodos = todos.length - activeTodos;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${activeTodos} items left`}
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

      {completedTodos > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
}
