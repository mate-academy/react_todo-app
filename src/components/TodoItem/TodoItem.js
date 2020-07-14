import React, { useContext } from 'react';
import { TodoShape } from '../Shapes/Shapes';
import Context from '../Context/Context';

export function TodoItem({ todo }) {
  const { todoToggle, removeTodo } = useContext(Context);
  const { title, id, completed } = todo;

  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${id}`}
          checked={completed}
          onChange={() => todoToggle(id)}
        />
        <label htmlFor={`todo-${id}`}>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => removeTodo(id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
}

TodoItem.propTypes = TodoShape.isRequired;
