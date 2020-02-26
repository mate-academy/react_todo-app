import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = (props) => {
  const {
    todo,
    onToogleComplete,
    onDelete,
  } = props;

  return (
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={`todo-${todo.id}`}
        onClick={onToogleComplete}
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

  onToogleComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
