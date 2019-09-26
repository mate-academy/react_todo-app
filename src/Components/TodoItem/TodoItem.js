import React from 'react';

const TodoItem = ({
  todoTitle, completed, todoId, onChangeCompleted,
}) => (
  <li className="todo">
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id="todo-1"
        checked={completed}
        value={completed}
        onChange={() => onChangeCompleted(todoId)}
      />
      <label htmlFor="todo-1">{todoTitle}</label>
      <button type="button" className="destroy" />
    </div>
  </li>
);

export default TodoItem;
