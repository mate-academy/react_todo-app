import React from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({
  handleFilter,
  handleClearCompleted,
}) => (
  <>
    <ul className="filters">
      <li>
        <a
          href="#/"
          className="selected"
          name="all"
          onClick={handleFilter}
        >
        All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          name="active"
          onClick={handleFilter}
        >
       Active
        </a>
      </li>

      <li>
        <a
          name="completed"
          href="#/completed"
          onClick={handleFilter}
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

TodoFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
};

export default TodoFilter;
