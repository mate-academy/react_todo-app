import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = (props) => {
  const {
    todo,
    onToggleComplete,
    onDelete,
  } = props;

  return (
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onChange={() => onToggleComplete()}
      />
      <label
        htmlFor={`todo-${todo.id}`}
      >
        {todo.title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={onDelete}
      />
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,

  onToggleComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
