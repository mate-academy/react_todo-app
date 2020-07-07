import React from 'react';
import { ShapeTodo } from './Shapes';

export const Todo = ({
  selected, hideActive, hideCompleted, completed,
  title, onComplete, deleteTodo, startEditing, todoList, completedTodos,
}) => {
  const checkExecution = (event) => {
    const { checked } = event.target;
    const name = event.target.nextElementSibling.textContent;
    const newStates = {
      ...completedTodos,
      [name]: checked,
    };

    onComplete(newStates);
  };

  const handleDelete = (event) => {
    const name = event.target.previousElementSibling.textContent;
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
    <li style={{ display: invisible }}>
      <div className="view">
        <input
          checked={completed}
          type="checkbox"
          className="toggle"
          id={title}
          onChange={checkExecution}
        />
        <label htmlFor={title} style={{ textDecoration: crossed }}>
          {title}
        </label>
        <button type="button" className="destroy" onClick={handleDelete} />
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
