import React from 'react';

const TodoItem = ({ todo }) => {
  return (
    <li className="">
      <div className="view">
        <input type="checkbox" className="toggle" id="todo-1" />
        <label htmlFor="todo-1">{todo.title}</label>
        <button type="button" className="destroy" />
      </div>
    </li>
  );
};

export default TodoItem;
