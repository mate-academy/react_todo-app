import React, { useState, useEffect } from 'react';
import cn from 'classnames';

export const Todo = ({ todoItem, deleteTodo, itemsList }) => {
  const [currentKey, setKey] = useState(0);
  const [complete, completeToggle] = useState(false);

  const handleToggle = (key) => {
    completeToggle()
    itemsList.find(item => item.id === key).completed = complete;
    setKey(key);
  };


  return (
    <li
      className={
        cn({completed: todoItem.id === currentKey && complete})
      }
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onClick={() => handleToggle(todoItem.id)}
        />
        <label>{todoItem.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todoItem.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
