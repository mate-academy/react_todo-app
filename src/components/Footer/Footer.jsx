import React from 'react';
import PropTypes from 'prop-types';
import { TypeTodo } from '../../types';

export const Footer = ({ todos, clearCompleted }) => {
  const todosInProgress = todos.filter(todo => !todo.isCompleted);

  return (
    (
      <footer className="footer">
        <span className="todo-count">
          {todosInProgress.length}
          {' '}
          items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
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
    )
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(TypeTodo).isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
