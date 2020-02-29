import React from 'react';
import PropTypes from 'prop-types';

export function TodoFooter(props) {
  const {
    filter,
    todosCount,
    handleTab,
    handleClearCompleted,
    todos,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{`${todosCount} items left`}</span>
      <ul className="filters">
        <li>
          <button
            type="button"
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => handleTab('all')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => handleTab('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => handleTab('completed')}
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
  todosCount: PropTypes.number.isRequired,
  handleTab: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool,
    text: PropTypes.string,
  })).isRequired,
};
