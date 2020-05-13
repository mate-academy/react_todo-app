import React from 'react';
import PropTypes from 'prop-types';

const TodoFooter = ({
  handleCompletedFilter,
  handleActiveFilter,
  handleAllFilter,
  filter,
  clearCompleted,
  itemsLeft,
  clearVisibleButton,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {`${itemsLeft} items left`}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filter === 'All' ? 'selected' : ''}
          onClick={handleAllFilter}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filter === 'Active' ? 'selected' : ''}
          onClick={handleActiveFilter}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filter === 'Completed' ? 'selected' : ''}
          onClick={handleCompletedFilter}
        >
          Completed
        </a>
      </li>
    </ul>

    {clearVisibleButton && (
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    )}
  </footer>
);

TodoFooter.propTypes = {
  itemsLeft: PropTypes.number.isRequired,
  handleCompletedFilter: PropTypes.func.isRequired,
  handleActiveFilter: PropTypes.func.isRequired,
  handleAllFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  clearVisibleButton: PropTypes.bool.isRequired,
};

export default TodoFooter;
