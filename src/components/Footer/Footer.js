import React from 'react';
import { FooterShape } from '../Shape';

export const Footer = ({ todos, filterTodos, clearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">
      {todos.filter(todo => !todo.isCompleted).length}
      {' '}
      items left
    </span>

    <ul className="filters">
      <li>
        <button
          type="button"
          className="selected"
          name="All"
          onClick={filterTodos}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          name="Active"
          onClick={filterTodos}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          name="Completed"
          onClick={filterTodos}
        >
          Completed
        </button>
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

Footer.propTypes = FooterShape;
