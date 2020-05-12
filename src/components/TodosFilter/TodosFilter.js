import React from 'react';
import propTypes from 'prop-types';

const TodosFilter = ({ actualFilter, switchActiveTasks }) => (
  <li>
    <a
      href={`#/${actualFilter}`}
      onClick={() => switchActiveTasks(actualFilter)}
    >
      {actualFilter}
    </a>
  </li>
);

TodosFilter.propTypes = {
  actualFilter: propTypes.string.isRequired,
  switchActiveTasks: propTypes.func.isRequired,
};

export default TodosFilter;
