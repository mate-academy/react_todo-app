import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export function TodoFooter({
  handleDeleteCompleted, activeCount, completedCount,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${activeCount} items left`}
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

      {completedCount > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
}

TodoFooter.propTypes = {
  handleDeleteCompleted: PropTypes.func.isRequired,
  activeCount: PropTypes.number,
  completedCount: PropTypes.number,
};

TodoFooter.defaultProps = {
  activeCount: 0,
  completedCount: 0,
};
