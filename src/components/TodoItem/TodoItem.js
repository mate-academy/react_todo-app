import React from 'react';

const TodoItem = ({
  todo, index, handleDelete, handleClickCheckBox,
}) => (
  <li className={todo.completed ? 'completed' : ''}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        onClick={() => handleClickCheckBox(index)}
        checked={todo.completed}
      />
      <label>{todo.title}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => handleDelete(todo)}
      />
    </div>
  </li>
);

export default TodoItem;
