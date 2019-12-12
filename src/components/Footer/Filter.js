import React from 'react';
import PropTypes from 'prop-types';

const TaskFilter = ({ current, name, change }) => (
  <li>
    <a
      href={`#/${name}`}
      className={current === name ? 'selected' : ''}
      onClick={() => change(name)}
    >
      {name}
    </a>
  </li>
);

TaskFilter.propTypes = {
  current: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default TaskFilter;
