/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

interface ItemProps {
  todo: Todo;
  onDelete: (id: Date) => void;
  onRename: (id: Date, title: string) => void;
  onToggle: (id: Date) => void;
}

export const TodoItem: React.FC<ItemProps> = ({
  todo,
  onDelete,
  onRename,
  onToggle,
}) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const saveEdit = () => {
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle === '') {
      onDelete(todo.id);
    } else if (trimmedTitle !== todo.title) {
      onRename(todo.id, trimmedTitle);
    }

    setEditing(false);
  };

  const cancelEdit = () => {
    setEditTitle(todo.title);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
      </label>

      {!isEditing && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setEditing(true);
              setEditTitle(todo.title);
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}

      {isEditing && (
        <form
          onSubmit={e => {
            e.preventDefault();
            saveEdit();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            ref={inputRef}
            autoComplete="off"
          />
        </form>
      )}
    </div>
  );
};
