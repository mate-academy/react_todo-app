import React from 'react';
import className from 'classnames';
import { TodosFilterTypes } from '../Shapes/Shapes';

export const TodosFilter = (props) => {
  const {
    tasks,
    onToggleTask,
    onClear,
    tab,
  } = props;

  const NumberOfActiveTasks = tasks
    .filter(task => task.completed === false).length;

  const linkClassNames = className({
    selected: (tab === 'all'),
  });

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${NumberOfActiveTasks} items left`}
      </span>
      <ul className="filters">
        <li>
          <a
            className={linkClassNames}
            name="all"
            href="#/"
            onClick={onToggleTask}
          >
            All
          </a>
        </li>

        <li>
          <a
            className={className({ selected: (tab === 'active') })}
            name="active"
            href="#/active"
            onClick={onToggleTask}
          >
            Active
          </a>
        </li>

        <li>
          <a
            className={className({ selected: (tab === 'completed') })}
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
