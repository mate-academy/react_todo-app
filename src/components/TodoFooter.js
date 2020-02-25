import React from 'react';
import PropTypes from 'prop-types';

export function TodoFooter(props) {
  const {
    filter,
    counts,
    handleToggleTab,
    handleClearCompleted,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{`${counts} items left`}</span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => handleToggleTab('all')}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => handleToggleTab('active')}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => handleToggleTab('completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={handleClearCompleted}
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
};
