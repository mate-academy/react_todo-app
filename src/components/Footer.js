import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Todo from './Todo';

const Footer = ({ tasks, deleteCompleted, left, filterAll, filterActive, filterCompleted }) => {
console.log(" -> left", left)

  if (tasks.length === 0) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        {left}
        &nbsp;
        items left
      </span>
      <ul className="filters">
        <li>
          <a
            href="/"
            className="selected"
            onClick={event => filterAll(event)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="/active"
            onClick={event => filterActive(event)}
          >Active</a>
        </li>

        <li>
          <a
            href="/completed"
            onClick={event => filterCompleted(event)}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
