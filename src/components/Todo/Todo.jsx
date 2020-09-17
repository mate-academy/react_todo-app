import React, { useState } from 'react';
import cn from 'classnames';

export const Todo = ({ item, handleStatus }) => {
  // const [todoCompleted, setTodoCompleted] = useState(false);
  

  return (
    <li className={cn({ 'completed': item.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          onChange={() => handleStatus(item.id)}
        />
        <label>{item.title}</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>
  )
}