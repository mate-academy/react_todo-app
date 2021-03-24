import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Footer({
  activeTodos,
  onFilterTodos,
  onRemoveCompleted,
  todos,
}) {
  const [sortedTodos, setSortedTodos] = useState('all');
  const isCompleted = todos.some(({ completed }) => completed);

  const handleSortByState = (currentState) => {
    setSortedTodos(currentState);
    onFilterTodos(currentState);
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames(
              { selected: sortedTodos === 'all' },
            )}
            onClick={() => handleSortByState('all')}
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
            onClick={() => handleSortByState('active')}
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
            onClick={() => handleSortByState('completed')}
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
  activeTodos: PropTypes.number.isRequired,
  onRemoveCompleted: PropTypes.func.isRequired,
  onFilterTodos: PropTypes.func.isRequired,
};
