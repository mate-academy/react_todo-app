import React from 'react';

import { NavFiltersLink } from '../NavFiltersLink/NavFiltersLink';
import { TodoMenuShapes } from '../../Shapes/Shapes';

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

TodoMenu.propTypes = TodoMenuShapes;
