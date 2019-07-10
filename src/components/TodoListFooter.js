import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from './Footer/Filter';

const TodoListFooter = ({
  finishedTasks,
  unfinishedTasks,
  changeFilter,
  currentFilter,
  removeSelectedTasks,
}) => (
  <footer className="footer">
    {unfinishedTasks.length > 0
    && (
      <span className="todo-count">
        {`${unfinishedTasks.length} items left`}
      </span>
    )}
    <ul className="filters">
      <TaskFilter change={changeFilter} current={currentFilter} name="all" />
      <TaskFilter change={changeFilter} current={currentFilter} name="active" />
      <TaskFilter
        change={changeFilter}
        current={currentFilter}
        name="completed"
      />
    </ul>

    {finishedTasks.length > 0
    && (
      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        active={(finishedTasks.length > 0).toString()}
        onClick={() => removeSelectedTasks(finishedTasks)}
      >
        Clear completed
      </button>
    )}
  </footer>
);

TodoListFooter.propTypes = {
  finishedTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  unfinishedTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  removeSelectedTasks: PropTypes.func.isRequired,
};

export default TodoListFooter;
