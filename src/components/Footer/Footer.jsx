import React from 'react';
import PropTypes from 'prop-types';
import { TypeTodo } from '../../types';

export const Footer = ({
  filter,
  todos,
  clearCompleted,
  handleFilter,
}) => {
  const todosInProgress = todos.filter(todo => !todo.isCompleted);

  const handleFilterClick = (e) => {
    const arr = e.target.href.split('/');
    let value = arr[arr.length - 1];

    if (!value) {
      value = 'all';
    }

    handleFilter(value);
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
            onClick={e => handleFilterClick(e)}
            href="#/"
          >
            All
          </a>
        </li>

        <li>
          <a
            onClick={e => handleFilterClick(e)}
            href="#/active"
          >
            Active
          </a>
        </li>

        <li>
          <a
            onClick={e => handleFilterClick(e)}
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
  filter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
