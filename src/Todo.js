import React from 'react';
import { ShapeTodo } from './Shapes';

export const Todo = ({
  selected, hideActive, hideCompleted, completed,
  title, onComplete, deleteTodo, startEditing, todoList, completedTodos,
}) => {
  const checkExecution = (ev) => {
    (ev.target.checked)
      ? onComplete(ev.target.nextElementSibling.textContent, true)
      : onComplete(ev.target.nextElementSibling.textContent, false);
  };

  const handleDelete = (ev) => {
    const el = ev.target.previousElementSibling.textContent;
    const listWithoutEl = todoList.filter(item => item !== el);
    const visibility = !!listWithoutEl.length;
    const completedTasks = { ...completedTodos };

    delete completedTasks[el];

    deleteTodo(listWithoutEl, visibility, completedTasks);
  };

  const crossed = (selected || completed)
    ? 'line-through'
    : 'none';
  const invisible = ((completed && hideCompleted)
  || (!completed && hideActive))
    ? 'none'
    : 'block';

  return (
    <li
      style={{ display: invisible }}
      onDoubleClick={() => startEditing(title)}
    >
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
          onClick={ev => handleDelete(ev)}
        />
        <button
          type="button"
          className="edit_btn"
          onClick={() => startEditing(title)}
          value="edit"
        />
      </div>
    </li>
  );
};

Todo.propTypes = ShapeTodo.isRequired;
