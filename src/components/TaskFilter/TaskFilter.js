import React from 'react';
import propTypes from 'prop-types';

const TaskFilter = ({ actualFilter, toggleActiveTasks }) => (
  <li>
    <a
      href={`#/${actualFilter}`}
      onClick={() => toggleActiveTasks(actualFilter)}
    >
      {actualFilter}
    </a>
  </li>
);

TaskFilter.propTypes = {
  actualFilter: propTypes.string.isRequired,
  toggleActiveTasks: propTypes.func.isRequired,
};

export default TaskFilter;
