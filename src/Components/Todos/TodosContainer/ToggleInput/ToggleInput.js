import React from 'react';
import PropTypes from 'prop-types';

const ToggleInput = ({ todos, toggleAllCompleted }) => {
  const isAllCompleted = todos.every(todo => todo.completed === true);

  return (
    <div>
      <input
        onClick={toggleAllCompleted}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={isAllCompleted && todos.length > 0} // fix this
        onChange={(e) => {}}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </div>
  );
};

ToggleInput.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  toggleAllCompleted: PropTypes.func.isRequired,
};

export default ToggleInput;
