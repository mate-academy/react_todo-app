import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = ({ filter, setFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={filter ? '' : 'selected'}
        onClick={() => setFilter('')}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={filter === 'active' ? 'selected' : ''}
        onClick={() => setFilter('active')}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={filter === 'completed' ? 'selected' : ''}
        onClick={() => setFilter('completed')}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TodosFilter;
