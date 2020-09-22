import React from 'react';

export const TodoItem = ({ todo }) => {
  return (
    <>
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>{todo.title}</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </>
  );
};
