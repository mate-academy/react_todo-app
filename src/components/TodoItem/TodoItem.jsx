import React, { useContext } from 'react';
import { Context } from '../../context';

export const TodoItem = ({ todo }) => {
  const { changeTodoStatus } = useContext(Context);
  const { removeTodo } = useContext(Context);

  return (
    <>
      <li
        key={todo.id}
        className={todo.completed ? 'completed' : ''}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={() => changeTodoStatus(todo.id)}
          />
          <label>{todo.title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => removeTodo(todo.id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    </>
  );
}

