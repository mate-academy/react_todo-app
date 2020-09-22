/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({
  todo,
  toggleStatus,
  deleteTodo,
  editTitle,
}) => {
  return (
    <li key={todo.id}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => toggleStatus(todo.id)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.objectOf().isRequired,
  toggleStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTitle: PropTypes.func.isRequired,
};
