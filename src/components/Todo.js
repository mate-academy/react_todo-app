import React from 'react';

export function Todo() {
  return (
    <li>
      <div className="view">
        <input type="checkbox" className="toggle" id="todo-1" />
        <label htmlFor="todo-1">asdfghj</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>
  );
}
