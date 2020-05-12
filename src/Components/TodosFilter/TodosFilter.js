import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const TodosFilter = ({
  filterSelector,
  activeTasksCounter,
  clearButtonStatus,
  removeCheckedTasks,
  activeFilter,
}) => {
  const activateFiltration = (event, filterSetter) => {
    const { text } = event.target;

    filterSetter(text);
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        unfinished tasks
        {' '}
        {activeTasksCounter()}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({
              selected: activeFilter === 'All',
            })}
            onClick={(e) => {
              activateFiltration(e, filterSelector);
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            className={cn({
              selected: activeFilter === 'Active',
            })}
            href="#/active"
            onClick={(e) => {
              activateFiltration(e, filterSelector);
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            className={cn({
              selected: activeFilter === 'Completed',
            })}
            href="#/completed"
            onClick={(e) => {
              activateFiltration(e, filterSelector);
            }}
          >
            Completed
          </a>
        </li>
      </ul>
      {clearButtonStatus && (
        <button
          type="button"
          className="clear-completed"
          onClick={removeCheckedTasks}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

TodosFilter.propTypes = {
  removeCheckedTasks: PropTypes.func.isRequired,
  activeTasksCounter: PropTypes.func.isRequired,
  filterSelector: PropTypes.func.isRequired,
  clearButtonStatus: PropTypes.bool.isRequired,
  activeFilter: PropTypes.string.isRequired,
};

export default TodosFilter;
