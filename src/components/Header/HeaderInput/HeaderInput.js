import React from 'react';
import PropTypes from 'prop-types';

export const HeaderInput = ({ handleAddTask, task }) => (
  <input
    className="new-todo"
    maxLength="25"
    placeholder="What needs to be done?"
    value={task}
    onChange={event => handleAddTask(event.target.value)}
    required
  />
);

HeaderInput.propTypes = {
  handleAddTask: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired,
};
