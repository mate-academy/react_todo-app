import React from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({
  handleShowAll,
  handleShowCompleted,
  handleShowActive,
  handleClearCompleted,
}) => (
  <>
    <ul className="filters">
      <li>
        <a
          href="#/"
          className="selected"
          name="all"
          onClick={handleShowAll}
        >
        All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          name="false"
          onClick={handleShowActive}
        >
       Active
        </a>
      </li>

      <li>
        <a
          name="true"
          href="#/completed"
          onClick={handleShowCompleted}
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
  handleShowAll: PropTypes.func.isRequired,
  handleShowActive: PropTypes.func.isRequired,
  handleShowCompleted: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
};

export default TodoFilter;
