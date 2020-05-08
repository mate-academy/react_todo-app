import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = ({ filter, onFilter }) => (

  <ul className="filters">
    <li>
      <a
        href="#/"
        className={filter === 'all' ? 'selected' : ''}
        onClick={() => onFilter('all')}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={filter === 'active' ? 'selected' : ''}
        onClick={() => onFilter('active')}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={filter === 'completed' ? 'selected' : ''}
        onClick={() => onFilter('completed')}
      >
        Completed
      </a>
    </li>
  </ul>

);

TodosFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodosFilter;
