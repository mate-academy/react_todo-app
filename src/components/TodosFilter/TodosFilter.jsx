import React from 'react';
import PropTypes from 'prop-types';

export function TodosFilter({
  todosCompletedLength,
  filteredTodos,
  clearCompleted,
}) {
  return (
    <>
      <span className="todo-count">
        {`${todosCompletedLength} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            name="All"
            className="selected"
            onClick={e => filteredTodos(e.target.name)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            name="active"
            onClick={e => filteredTodos(e.target.name)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            name="completed"
            href="#/completed"
            onClick={e => filteredTodos(e.target.name)}
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
    </>
  );
}

TodosFilter.propTypes = {
  todosCompletedLength: PropTypes.number.isRequired,
  filteredTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
