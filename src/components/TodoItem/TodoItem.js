import React from 'react';
import './TodoItem.scss';
import { TodoItemTypes } from '../../constants/proptypes';

const TodoItem = (
  {
    htmlFor,
    removeTodo,
    switchCompleted,
    id,
    title,
    completed,
  }
) => (
  <li className={completed ? 'completed' : ''}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={htmlFor}
        name={htmlFor}
        checked={completed}
        onChange={() => switchCompleted(id)}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label htmlFor={htmlFor}>
        {title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => removeTodo(id)}
      />
    </div>
  </li>
);

TodoItem.propTypes = TodoItemTypes;

export default TodoItem;
