/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
// import React from 'react';

export const TodoItem = ({ todo }) => {
  const { id, title, completed } = todo;
  const [isCompleted, setCompleted] = useState(completed);

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('todo'));

    console.log(a);
  }, [isCompleted]);

  const handleCompleted = ({ target: { checked, id: todoId } }) => {
    const arr = JSON.parse(localStorage.getItem('todo'));

    const updateArr = arr.map((item, idx) => {
      const findTodo = JSON.parse(item);

      if (findTodo.id === +todoId) {
        setCompleted(!isCompleted);
        findTodo.completed = isCompleted;
      }

      return JSON.stringify(findTodo);
    });

    localStorage.setItem('todo', JSON.stringify(updateArr));
    // console.log(updateArr);
  };

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          className="toggle"
          id={id}
          onChange={handleCompleted}
        />
        <label htmlFor={id}>{title}</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
