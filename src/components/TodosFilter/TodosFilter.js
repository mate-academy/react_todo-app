import React from 'react';
import className from 'classnames';
import { TodosFilterTypes } from '../Shapes/Shapes';

export const TodosFilter = (props) => {
  const {
    tasks,
    onToggleTask,
    onClear,
    showOnlyActive,
    showOnlyCompleted,
  } = props;

  const activeTasks = tasks.filter(task => task.completed === false).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${activeTasks}
          items left`}
      </span>
      <ul className="filters">
        <li>
          <a
            className={className({ selected: !showOnlyActive
              && !showOnlyCompleted })}
            name="all"
            href="#/"
            onClick={onToggleTask}
          >
            All
          </a>
        </li>

        <li>
          <a
            className={className({ selected: showOnlyActive })}
            name="active"
            href="#/active"
            onClick={onToggleTask}
          >
            Active
          </a>
        </li>

        <li>
          <a
            className={className({ selected: showOnlyCompleted })}
            name="completed"
            href="#/completed"
            onClick={onToggleTask}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={onClear}
      >
        Clear completed
      </button>
    </footer>
  );
};

TodosFilter.propTypes = TodosFilterTypes;
