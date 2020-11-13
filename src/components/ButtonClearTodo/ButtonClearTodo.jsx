import React from 'react';
import { ButtonClearTodoShape } from '../../shapes/ButtonClearTodoShape';

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

ButtonClearTodo.propTypes = ButtonClearTodoShape;
