import React from 'react';
import { ShapeTodo } from './Shapes';

export const Todo = ({
  selected, hideActive, hideCompleted, completed,
  title, onComplete, deleteTodo,
}) => {
  const checkExecution = (ev) => {
    (ev.target.checked)
      ? onComplete(ev.target.nextElementSibling.textContent, true)
      : onComplete(ev.target.nextElementSibling.textContent, false);
  };

  const crossed = (selected || completed)
    ? 'line-through'
    : 'none';
  const invisible = ((completed && hideCompleted)
  || (!completed && hideActive))
    ? 'none'
    : 'block';

  return (
    <li style={{ display: invisible }}>
      <div className="view">
        <input
          checked={completed}
          type="checkbox"
          className="toggle"
          id={title}
          onChange={ev => checkExecution(ev)}
        />
        <label
          htmlFor={title}
          style={{ textDecoration: crossed }}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={ev => deleteTodo(ev)}
        />
      </div>
    </li>
  );
};

Todo.propTypes = ShapeTodo.isRequired;
