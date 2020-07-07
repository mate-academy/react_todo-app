import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const Footer = ({ todos, clearCompleted }) => {
  if (!todos.length) {
    return <></>;
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        {todos.filter(todo => !todo.isCompleted).length}
        &nbsp;items left
      </span>

      <ul className="filters">
        <li>
          <NavLink exact to="/" activeClassName="selected">All</NavLink>
        </li>

        <li>
          <NavLink to="/active" activeClassName="selected">Active</NavLink>
        </li>

        <li>
          <NavLink to="/completed" activeClassName="selected">
            Completed
          </NavLink>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  })).isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
