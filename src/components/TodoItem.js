import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = (
  { todo,
    statusToogler },
) => (
  <li
    className={todo.completed ? 'completed' : ''}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        onChange={() => statusToogler(todo.id)}
        checked={todo.completed}
      />
      <label>{todo.title}</label>
      <button type="button" className="destroy" />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({ id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired }).isRequired,
  statusToogler: PropTypes.func.isRequired,
};
