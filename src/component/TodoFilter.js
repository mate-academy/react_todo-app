import React from 'react';

import PropTypes from 'prop-types';

const TodoFilter = ({
  toggleShowActive,
  toggleShowAll,
  toggleShowCompleted,
  activeFilter,
}) => (
  (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={activeFilter === false ? 'selected' : ''}
          onClick={toggleShowAll}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={activeFilter === 'Active' ? 'selected' : ''}
          onClick={toggleShowActive}
        >
            Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={activeFilter === 'Completed' ? 'selected' : ''}
          onClick={toggleShowCompleted}
        >
          Completed
        </a>
      </li>
    </ul>
  )
);

TodoFilter.propTypes = {
  toggleShowActive: PropTypes.func.isRequired,
  toggleShowAll: PropTypes.func.isRequired,
  toggleShowCompleted: PropTypes.func.isRequired,
  activeFilter: PropTypes.bool.isRequired,
};

export default TodoFilter;
