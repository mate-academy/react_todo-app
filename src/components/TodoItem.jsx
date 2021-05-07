import React, { useState } from 'react';
import classNames from 'classnames';

export const TodoItem = ({ todo, handleDelete, handleChecked, updateTodoTitle }) => {
  const [isEditTodos, setIsEditTodos] = useState(false);
  const [todoValue, setTodoValue] = useState(todo.title);

  return (
    <li
      className={classNames(
        { completed: todo.completed, editing: isEditTodos },
      )}
      onDoubleClick={() => {
        setIsEditTodos(true);
      }}
    >
      <div
        className="view"
      >
        {}
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={(event) => {
            handleChecked(event, todo.id);
          }}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            handleDelete(todo.id);
          }}
        />
      </div>
      <input
        value={todoValue}
        type="text"
        className="edit"
        onChange={(event) => {
          setTodoValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setIsEditTodos(false);
            updateTodoTitle(todo.id, todoValue);
            event.preventDefault();
          }

          if (event.key === 'Escape') {
            setTodoValue(todo.title);
            setIsEditTodos(false);
          }
        }}
      />
    </li>
  );
};
