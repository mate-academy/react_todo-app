import React from 'react';

const TodoItem = ({ todo, handleToggle }) => (
  <li key={todo.id} className="">
    <div className="view">
      <input type="checkbox" className="toggle" id={todo.id} onChange={() => handleToggle(todo.id)} />
      <label htmlFor="todo-1">{todo.title}</label>
      <button type="button" className="destroy" />
    </div>
  </li>
);

export default TodoItem;
