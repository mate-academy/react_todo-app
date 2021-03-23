import React from 'react';
import PropTypes from 'prop-types';

export function TodosFilter({
  checkCompeted,
  onFilter,
  handleClearCompleted,
}) {
  return (
    <>
      <span className="todo-count">
        {`${checkCompeted} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            name="All"
            className="selected"
            onClick={e => onFilter(e.target.name)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            name="active"
            onClick={e => onFilter(e.target.name)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            name="completed"
            href="#/completed"
            onClick={e => onFilter(e.target.name)}
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
    </>
  );
}

TodosFilter.propTypes = {
  checkCompeted: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
};
