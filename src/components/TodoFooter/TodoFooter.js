import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export const TodoFooter = (props) => {
  const {
    todos,
    clearComponent,
    handleCompletedFilter,
    handleActiveFilter,
    handleAll,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${todos.filter(todo => todo.completed === false)
          .length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a onClick={handleAll} href="#/" className="selected">All</a>
        </li>

        <li>
          <a onClick={handleActiveFilter} href="#/active">Active</a>
        </li>

        <li>
          <a onClick={handleCompletedFilter} href="#/completed">Completed</a>
        </li>
      </ul>

      <button
        onClick={clearComponent}
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
  todos: PropTypes.arrayOf(PropTypes.object),
  clearComponent: PropTypes.func,
  handleCompletedFilter: PropTypes.func,
  handleActiveFilter: PropTypes.func,
  handleAll: PropTypes.func,
};

TodoFooter.defaultProps = {
  todos: [],
  clearComponent: () => {},
  handleCompletedFilter: () => {},
  handleActiveFilter: () => {},
  handleAll: () => {},
};
