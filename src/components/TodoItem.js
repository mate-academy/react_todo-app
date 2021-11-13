import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
  todo,
  onComplete,
  onActiveEditTodo,
  onDelete,
}) => (
  <div className="view">
    <input
      type="checkbox"
      className="toggle"
      checked={todo.completed}
      onChange={() => onComplete(todo.id)}
    />
    <label
      onDoubleClick={() => onActiveEditTodo(todo.id)}
    >
      {todo.title}
    </label>
    <button
      type="button"
      className="destroy"
      onClick={() => onDelete(todo.id)}
    />
  </div>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onActiveEditTodo: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
