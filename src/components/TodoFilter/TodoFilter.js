import React from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({
  handleFilter,
  handleClearCompleted,
  filter,
}) => (
  <>
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filter === 'all' ? 'selected' : ''}
          name="all"
          onClick={handleFilter}
        >
        All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filter === 'active' ? 'selected' : ''}
          name="active"
          onClick={handleFilter}
        >
       Active
        </a>
      </li>

      <li>
        <a
          name="completed"
          className={filter === 'completed' ? 'selected' : ''}
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
  filter: PropTypes.string.isRequired,
};

export default TodoFilter;
