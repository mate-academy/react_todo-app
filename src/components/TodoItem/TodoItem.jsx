import React from 'react';

export const TodoItem = ({ todo }) => (
  <li className="completed" key={todo.id}>
    <div className="view">
      <input type="checkbox" className="toggle" />
      <label>{todo.title}</label>
      <button type="button" className="destroy" />
    </div>
  </li>
);
