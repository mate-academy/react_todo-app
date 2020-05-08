import React from 'react';
import PropTypes from 'prop-types';

const TaskAdd = ({ change, title, value }) => (
  <form onSubmit={change}>
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onChange={title}
      value={value}
    />
  </form>
);

TaskAdd.propTypes = {
  change: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default TaskAdd;
