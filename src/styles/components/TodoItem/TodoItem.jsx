import React from 'react';
import './TodoItem.scss';

export const TodoItem = ({ items }) => {

  return (

    <li>
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>asdfghj</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>

  );
};
