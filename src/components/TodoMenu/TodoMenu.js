import React from 'react';
import PropTypes from 'prop-types';

import { NavFiltersLink } from '../NavFiltersLink/NavFiltersLink';

export const TodoMenu = ({ activeTasks, clearCompleted, completedTasks }) => (
  <>
    <span className="todo-count">
      {`${activeTasks} items left`}
    </span>

    <NavFiltersLink />
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
