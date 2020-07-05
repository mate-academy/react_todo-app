import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ index, title, id, completed, onEdit, toggleCompleted }) => (
  <>
    <input
      type="checkbox"
      className="toggle"
      id={`todo-${index}`}
      checked={completed}
      onChange={() => toggleCompleted(id)}
    />
    <label
      htmlFor={`todo-${index}`}
      onClick={evt => evt.preventDefault()}
      onDoubleClick={onEdit}
    >
      {title}
    </label>
  </>
);

export default Toggle;

Toggle.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
};
