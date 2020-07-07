import React from 'react';
import { ShapeTodo } from './Shapes';

export const Todo = ({
  selected, hideActive, hideCompleted, completed,
  title, onComplete, deleteTodo, startEditing, todoList, completedTodos,
}) => {
  const checkExecution = (checked, name) => {
    const newStates = {
      ...completedTodos,
      [name]: checked,
    };

    onComplete(newStates);
  };

  const handleDelete = (name) => {
    const listWithoutEl = todoList.filter(item => item !== name);
    const visibility = !!listWithoutEl.length;
    const completedTasks = { ...completedTodos };

    delete completedTasks[name];

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
          onChange={ev => checkExecution(
            ev.target.checked, ev.target.nextElementSibling.textContent,
          )}
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
          onClick={ev => handleDelete(
            ev.target.previousElementSibling.textContent,
          )}
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
