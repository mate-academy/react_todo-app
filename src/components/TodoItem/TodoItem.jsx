import React from 'react';
import './TodoItem.scss';

export const TodoItem = ({ todo, onDelete }) => {

  return (

    <li>
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>{todo[0]}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => onDelete(todo[1])}
        />
      </div>
      <input type="text" className="edit" />
    </li>

  );
};
