import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
  handleRemove,
  id,
  todo,
  handleCheckBox,
}) => (
  <li className={todo.completed ? 'completed' : ''}>
    <div className="view">
      <input
        onChange={() => handleCheckBox(id)}
        checked={todo.completed}
        type="checkbox"
        className="toggle"
        id={`todo-${id}`}
      />
      <label htmlFor={`todo-${id}`}>
        {todo.text}
      </label>
      <button
        onClick={() => handleRemove(id)}
        type="button"
        className="destroy"
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default TodoItem;
