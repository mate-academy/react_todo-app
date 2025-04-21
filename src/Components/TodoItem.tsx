/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';

type TodoItemProps = {
  todo: Todo;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number, title: string, completed?: boolean) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo?.title || '');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  if (!todo || !onUpdate || !onDelete) {
    return null;
  }

  const handleEdit = () => {
    setIsEditing(true);
    setNewTitle(todo.title);
  };

  const handleSave = () => {
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle) {
      onUpdate(todo.id, trimmedTitle);
    } else {
      onDelete(todo.id);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`} data-cy="Todo">
      <label className="todo__status-label">
        <input
          type="checkbox"
          data-cy="TodoStatus"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onUpdate(todo.id, todo.title, !todo.completed)}
        />
      </label>

      {isEditing ? (
        <input
          data-cy="TodoTitleField"
          autoFocus
          type="text"
          className="todo__title-field"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleEdit}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          data-cy="TodoDelete"
          className="todo__remove"
          onClick={() => onDelete(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TodoItem;
