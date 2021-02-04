/* eslint-disable */
import React, { useState } from 'react';

export const TodoItem = ({ todo, idx, onDeleteTodo }) => {
  const [isChecked, setIsChecked] = useState('');
  console.log(todo)

  return (
    <li className={todo.completed || isChecked ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label>{todo.title}</label>
        <button
          onClick={() => onDeleteTodo(idx)}
          type="button"
          className="destroy"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  )
}
