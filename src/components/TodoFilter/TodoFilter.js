import React from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({
  handleSelect,
  handleClearCompleted,
}) => (
  <>
    <ul className="filters">
      <li>
        <a
          href="#/"
          className="selected"
          name="all"
          onClick={handleSelect}
        >
        All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          name="false"
          onClick={handleSelect}
        >
       Active
        </a>
      </li>

      <li>
        <a
          name="true"
          href="#/completed"
          onClick={handleSelect}
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
  handleSelect: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
};

export default TodoFilter;
