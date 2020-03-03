import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export const TodoFooter = (props) => {
  const {
    todos,
    clearCompleted,
    handleCompletedFilter,
    handleActiveFilter,
    handleAll,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${todos.filter(todo => !todo.completed)
          .length} items left`}
      </span>

      <ul className="filters">
        <li>
          <button
            type="button"
            onClick={handleAll}
            className="buttonFooter"
          >
            All
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={handleActiveFilter}
            className="buttonFooter"
          >
            Active
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={handleCompletedFilter}
            className="buttonFooter"
          >
            Completed
          </button>
        </li>
      </ul>

      <button
        onClick={clearCompleted}
        type="button"
        className={cx('clear-completed', { 'hidden-but': todos
          .every(todo => todo.completed === false) })}
      >
        Clear completed
      </button>
    </footer>
  );
};

TodoFooter.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    completed: PropTypes.bool,
    title: PropTypes.string,
  })).isRequired,
  clearCompleted: PropTypes.func.isRequired,
  handleCompletedFilter: PropTypes.func.isRequired,
  handleActiveFilter: PropTypes.func.isRequired,
  handleAll: PropTypes.func.isRequired,
};
