import React from 'react';

function TodoItem({ item, toDelete, toggled }) {
  return (
    <li className={item.done ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${item.id}`}
          onChange={() => toggled(item.id)}
          checked={item.done}
        />
        <label htmlFor={`todo-${item.id}`}>{ item.title }</label>
        <button
          type="button"
          className="destroy"
          onClick={() => toDelete(item.id)}
        />
      </div>
    </li>
  );
}

export default TodoItem;
