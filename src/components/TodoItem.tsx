import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { useTodo } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { handleToggle, handleDelete, handleUpdate } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(todo.title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate(todo.id, editValue);
    setIsEditing(false);
  };

  const handleBlur = () => {
    handleUpdate(todo.id, editValue);
    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(todo.title);
    }
  };

  const handleDeleteAndFocus = () => {
    handleDelete(todo.id);
    const newTodoInput = document.querySelector(
      '.todoapp__new-todo',
    ) as HTMLInputElement;

    if (newTodoInput) {
      newTodoInput.focus();
    }
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleToggle(todo.id)}
        />
        <span className="todo__status-label-text">Toggle todo status</span>
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            ref={editInputRef}
          />
        </form>
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
            onClick={handleDeleteAndFocus}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
