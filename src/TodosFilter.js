import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = (
  { handlerFilterAll, handlerFilterActive, handlerFilterCompleted }
) => (
  <ul className="filters">
    <li>
      <a href="#/" className="selected" onClick={handlerFilterAll}>All</a>
    </li>

    <li>
      <a href="#/active" onClick={handlerFilterActive}>Active</a>
    </li>

    <li>
      <a href="#/completed" onClick={handlerFilterCompleted}>Completed</a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  handlerFilterAll: PropTypes.func.isRequired,
  handlerFilterActive: PropTypes.func.isRequired,
  handlerFilterCompleted: PropTypes.func.isRequired,
};

export default TodosFilter;
