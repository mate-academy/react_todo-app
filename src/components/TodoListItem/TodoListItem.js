import React from 'react';

function TodoListItem({ todoListItem }) {

  const t = todoListItem || null;

  let title = t?.title;
  let completed = t?.completed;
  let id = t?.id;

  return (
    <li className={(completed ? "completed" : "view")}>
      <div className="view">
        <input type="checkbox" className="toggle" id={id} />
        <label htmlFor={id}>{title}</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>
  )
}

export default TodoListItem;


