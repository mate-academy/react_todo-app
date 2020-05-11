import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = ({ updateTodosToShow }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        onClick={() => (updateTodosToShow('all'))}
      >
        All
      </a>
    </li>
    <li>
      <a
        href="#/active"
        onClick={() => (updateTodosToShow('active'))}
      >
        Active
      </a>
    </li>
    <li>
      <a
        href="#/completed"
        onClick={() => (updateTodosToShow('completed'))}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  updateTodosToShow: PropTypes.func.isRequired,
};

export default TodosFilter;
