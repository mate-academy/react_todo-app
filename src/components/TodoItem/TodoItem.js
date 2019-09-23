import React from 'react';
import './TodoItem.css';
import cx from 'classnames';

export const TodoItem = ({
  todo, index, checkBoxClick, handleDelete
}) => {
  const crossedItem = cx({
    '': true,
    'crossed-item': todo.completed,
  });

  return (
    <li className={crossedItem}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id=""
          onClick={() => checkBoxClick(index)}
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
};
