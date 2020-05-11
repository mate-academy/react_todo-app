import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const TodosFilter = ({ tasksToShow, actualFilter, toggleActiveTasks }) => (
  <li>
    <a
      href={`#/${actualFilter}`}
      className={classnames({ selected: actualFilter === tasksToShow })}
      onClick={() => toggleActiveTasks(actualFilter)}
    >
      {actualFilter}
    </a>
  </li>
);

TodosFilter.propTypes = {
  tasksToShow: propTypes.string.isRequired,
  actualFilter: propTypes.string.isRequired,
  toggleActiveTasks: propTypes.func.isRequired,
};

export default TodosFilter;
