import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

export const TodoFilter = ({
  activeTodos,
  completedTodos,
  filter,
  setFilter,
  onDeleteCompletedTodos,
}) => (
  <>
    <span className="todo-count">
      {`${activeTodos.length} items left`}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={className(
            filter === 'All' ? 'selected' : '',
          )}
          onClick={clickEvent => setFilter(clickEvent.target.textContent)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={className(
            filter === 'Active' ? 'selected' : '',
          )}
          onClick={clickEvent => setFilter(clickEvent.target.textContent)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={className(
            filter === 'Completed' ? 'selected' : '',
          )}
          onClick={clickEvent => setFilter(clickEvent.target.textContent)}
        >
          Completed
        </a>
      </li>
    </ul>

    {completedTodos.length > 0 && (
      <button
        type="button"
        className="clear-completed"
        onClick={onDeleteCompletedTodos}
      >
        Clear completed
      </button>
    )}
  </>
);

TodoFilter.propTypes = {
  activeTodos: PropTypes.instanceOf(Array).isRequired,
  completedTodos: PropTypes.instanceOf(Array).isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  onDeleteCompletedTodos: PropTypes.func.isRequired,
};
