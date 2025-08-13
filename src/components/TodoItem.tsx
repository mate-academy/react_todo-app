/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Todo, useTodos } from './TodoContext';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(todo.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedValue = editValue.trim();

      if (trimmedValue) {
        updateTodo(todo.id, trimmedValue);
        setIsEditing(false);
      } else {
        deleteTodo(todo.id);
        setIsEditing(false);
      }
    }
  };

  const handleBlur = () => {
    const trimmedValue = editValue.trim();

    if (trimmedValue) {
      updateTodo(todo.id, trimmedValue);
      setIsEditing(false);
    } else {
      deleteTodo(todo.id);
      setIsEditing(false);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditValue(todo.title);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div data-cy="Todo" className="todo">
        <label
          className="todo__status-label"
          htmlFor={`todo-status-${todo.id}`}
        >
          <input
            id={`todo-status-${todo.id}`}
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
        </label>
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label" htmlFor={`todo-status-${todo.id}`}>
        <input
          id={`todo-status-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      <span
        data-cy="TodoTitle"
        className="todo__title"
        onDoubleClick={handleDoubleClick}
      >
        {todo.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => deleteTodo(todo.id)}
      >
        ×
      </button>
    </div>
  );
};
