import React from 'react';
import PropTypes from 'prop-types';
import { TypeTodo } from '../../types';
import { FILTERS } from '../../constants';

export const Footer = ({
  todos,
  clearCompleted,
  handleFilter,
}) => {
  const todosInProgress = todos.filter(todo => !todo.completed);

  const onClickHandleFilter = (filter) => {
    handleFilter(filter);
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {todosInProgress.length}
        {' '}
        items left
      </span>

      <ul
        className="filters"
      >
        <li>
          <a
            onClick={() => onClickHandleFilter(FILTERS.all)}
            href="#/"
          >
            All
          </a>
        </li>

        <li>
          <a
            onClick={() => onClickHandleFilter(FILTERS.active)}
            href="#/active"
          >
            Active
          </a>
        </li>

        <li>
          <a
            onClick={() => onClickHandleFilter(FILTERS.completed)}
            href="#/completed"
          >
            Completed
          </a>
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

Footer.propTypes = {
  todos: PropTypes.arrayOf(TypeTodo).isRequired,
  clearCompleted: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
