import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Footer({
  quantity,
  onFilterTodos,
  onRemoveCompleted,
  todos,
}) {
  const [sortedTodos, setSortedTodos] = useState('all');
  const isCompleted = todos.some(({ completed }) => completed);

  const handleSortByAll = () => {
    setSortedTodos('all');
    onFilterTodos('all');
  };

  const handleSortByActive = () => {
    setSortedTodos('active');
    onFilterTodos('active');
  };

  const handleSortByCompleted = () => {
    setSortedTodos('completed');
    onFilterTodos('completed');
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${quantity} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames(
              { selected: sortedTodos === 'all' },
            )}
            onClick={handleSortByAll}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames(
              { selected: sortedTodos === 'active' },
            )}
            onClick={handleSortByActive}

          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames(
              { selected: sortedTodos === 'completed' },
            )}
            onClick={handleSortByCompleted}
          >
            Completed
          </a>
        </li>
      </ul>

      {isCompleted
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={onRemoveCompleted}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  quantity: PropTypes.number.isRequired,
  onRemoveCompleted: PropTypes.func.isRequired,
  onFilterTodos: PropTypes.func.isRequired,
};
