import React, { useContext } from 'react';
import { Context } from '../../context';

export const TodoItem = ({ toDosToShow }) => {
  const { changeTodoStatus } = useContext(Context);

  return (
    <>
      {toDosToShow.map(todo => (
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
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>
      ))}
    </>
  );
}

