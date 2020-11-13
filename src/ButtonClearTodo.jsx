import React from 'react';

export const ButtonClearTodo = ({
  id,
  deleteTodo,
}) => (
  <button
    type="button"
    className="destroy"
    onClick={() => deleteTodo(id)}
  />
);
