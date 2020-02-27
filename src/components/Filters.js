import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Filters = (props) => {
  const {
    todos,
    filter,
    handleFilter,
    clearCompleted,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>
      <ul className="filters">
        <li>
          <button
            type="button"
            onClick={() => handleFilter('all')}
            className={cn({ selected: filter === 'all' })}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleFilter('active')}
            className={cn({ selected: filter === 'active' })}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleFilter('completed')}
            className={cn({ selected: filter === 'completed' })}
          >
            Completed
          </button>
        </li>
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

Filters.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  clearCompleted: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
