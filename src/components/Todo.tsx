import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import { Todo as TodoType } from '../types/todo';

interface TodoProps {
  todo: TodoType;
}

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const { deleteTodo, toggleTodo, updateTodoTitle } = useTodos();

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleEditSubmit = () => {
    updateTodoTitle(todo.id, editTitle.trim());
    setIsEditing(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleEditBlur = () => {
    updateTodoTitle(todo.id, editTitle.trim());
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  const handleEditKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEditSubmit();
    }
  };

  const todoClassName = `todo ${todo.completed ? 'completed' : ''}`;

  return (
    <div data-cy="Todo" className={todoClassName}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggle}
          aria-label="Toggle todo status"
        />
      </label>

      {isEditing ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={editTitle}
          onChange={handleEditChange}
          onBlur={handleEditBlur}
          onKeyDown={handleEditKeyDown}
          onKeyUp={handleEditKeyUp}
          autoFocus
        />
      ) : (
        <>
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
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
