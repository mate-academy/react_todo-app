import React from 'react';
import { footerShape } from './shapes';

const Footer = ({ filterClass,
  tasks,
  deleteCompleted,
  filterAll,
  filters }) => {
  let left = 0;

  tasks.forEach((task) => {
    if (task.completed === false) {
      left += 1;
    }
  });

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
            className={filterClass[0]}
            onClick={event => filterAll(event)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="/active"
            className={filterClass[1]}
            onClick={event => filters(event, false, '', 'selected', '')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="/completed"
            className={filterClass[2]}
            onClick={event => filters(event, true, '', '', 'selected')}
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

Footer.propTypes = footerShape.isRequired;
