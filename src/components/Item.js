import React from 'react';

function Item({ item, toggleOne, clearItem }) {
  return (
    <li className={item.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={item.id}
          onChange={toggleOne}
          checked={item.completed}
        />
        <label htmlFor="todo-1">{item.title}</label>
        <button
          type="button"
          id={item.id}
          onClick={clearItem}
          className="destroy"
        />
      </div>
    </li>
  );
}

export default Item;
