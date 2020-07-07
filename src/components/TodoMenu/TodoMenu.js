import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';

export const TodoMenu = ({ activeTasks, clearCompleted, completedTasks }) => (
  <>
    <span className="todo-count">
      {`${activeTasks} items left`}
    </span>

    <ul className="filters">
      <li>
        <NavLink exact to="/" activeClassName="selected">All</NavLink>
      </li>
      <li>
        <NavLink to="/active" activeClassName="selected">Active</NavLink>
      </li>
      <li>
        <NavLink to="/completed" activeClassName="selected">Completed</NavLink>
      </li>
    </ul>
    {completedTasks
      ? (
        <button
          onClick={clearCompleted}
          type="button"
          className="clear-completed"
        >
          Clear completed
        </button>
      )
      : (
        <></>
      )
    }

  </>
);

TodoMenu.propTypes = {
  activeTasks: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  completedTasks: PropTypes.number.isRequired,
};
