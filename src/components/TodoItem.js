import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, statusOfTodo, handleRemoveTodo }) => {
  const { id, title, completed } = todo;

  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          checked={completed}
          onChange={() => statusOfTodo(id)}
        />
        <label htmlFor={id}>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => handleRemoveTodo(id)}
        />
      </div>
      <input type="text" className="edit" />
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  statusOfTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
};

export default TodoItem;
