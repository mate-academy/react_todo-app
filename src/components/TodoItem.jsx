/* eslint-disable arrow-body-style */
import React from 'react';

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
