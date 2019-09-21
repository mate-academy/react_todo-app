import React from 'react';

const TodoItem = ({ todo: { id, title } }) => {
  return (
    <li className="">
      <div className="view">
        <input type="checkbox" className="toggle" id={`todo-${id}`} />
        <label htmlFor={`todo-${id}`}>{title}</label>
        <button type="button" className="destroy" />
      </div>
    </li>
  );
}

export default TodoItem;