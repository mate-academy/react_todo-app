import React from 'react';
import { TodoShapes } from '../../Shapes/TodoShapes';

export const TodoItem = ({
  title,
  id,
  isCompleted,
  deleteTodo,
  completeTodo,
}) => (
  <>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={id}
        onChange={() => completeTodo(id)}
        checked={isCompleted}
      />
      <label htmlFor="todo-1">{title}</label>
      <button
        onClick={() => deleteTodo(id)}
        type="button"
        className="destroy"
        id={id}
      />
    </div>
    <input type="text" className="edit" />
  </>
);

TodoItem.propTypes = TodoShapes.isRequired;
