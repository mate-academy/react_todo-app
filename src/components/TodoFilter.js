import React from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({ todosFilter, filterDescription }) => (
  <ul className="filters">
    <li>
      <a
        onClick={() => todosFilter('all')}
        href="#/"
        className={filterDescription === 'all'
          ? 'selected'
          : ''}
      >
        All
      </a>
    </li>

    <li>
      <a
        onClick={() => todosFilter('active')}
        href="#/active"
        className={filterDescription === 'active'
          ? 'selected'
          : ''}
      >
        Active
      </a>
    </li>

    <li>
      <a
        onClick={() => todosFilter('completed')}
        href="#/completed"
        className={filterDescription === 'completed'
          ? 'selected'
          : ''}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodoFilter.propTypes = {
  todosFilter: PropTypes.func.isRequired,
  filterDescription: PropTypes.string.isRequired,
};

export default TodoFilter;
