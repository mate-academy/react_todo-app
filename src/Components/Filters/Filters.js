import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Filters = ({ todos, filter, handleFilter, clearCompleted }) => {
  const itemsLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <button
            className={cn({ selected: filter === 'all' })}
            type="button"
            onClick={() => handleFilter('all')}
          >
            All
          </button>
        </li>

        <li>
          <button
            className={cn({ selected: filter === 'active' })}
            type="button"
            onClick={() => handleFilter('active')}
          >
            Active
          </button>
        </li>

        <li>
          <button
            className={cn({ selected: filter === 'completed' })}
            type="button"
            onClick={() => handleFilter('completed')}
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
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  clearCompleted: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
