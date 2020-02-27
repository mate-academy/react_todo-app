import React from 'react';
import PropTypes from 'prop-types';

export function TodoFooter(props) {
  const {
    filter,
    counts,
    handleToggleTab,
    handleClearCompleted,
    todos,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{`${counts} items left`}</span>
      <ul className="filters">
        <li>
          <button
            type="button"
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => handleToggleTab('all')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => handleToggleTab('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => handleToggleTab('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={handleClearCompleted}
        disabled={todos.every(todo => todo.completed) ? 'disabled' : ''}
      >
        Clear completed
      </button>
    </footer>
  );
}

TodoFooter.propTypes = {
  filter: PropTypes.string.isRequired,
  counts: PropTypes.number.isRequired,
  handleToggleTab: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool,
    text: PropTypes.string,
  })).isRequired,
};
