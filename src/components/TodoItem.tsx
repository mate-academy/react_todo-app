import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onUpdateTitle: (id: number, newTitle: string) => Promise<boolean>;
  processing: boolean;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onToggle,
  onDelete,
  onUpdateTitle,
  processing,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setIsEditing(false);
  }, [todo.title, todo.completed]);

  const handleToggle = () => {
    onToggle(todo);
    setIsEditing(false);
  };

  const saveEditing = () => {
    const trimmed = editedTitle.trim();

    if (trimmed === '') {
      onDelete(todo.id);

      return;
    }

    if (trimmed === todo.title) {
      setIsEditing(false);

      return;
    }

    onUpdateTitle(todo.id, trimmed).then(success => {
      if (success) {
        setIsEditing(false);
      }
    });
  };

  const cancelEditing = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEditing();
    }

    if (e.key === 'Escape') {
      cancelEditing();
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
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={`todo-${todo.id}`} className="todo__status-label">
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={processing}
          aria-checked={todo.completed}
          aria-label={`Mark todo "${todo.title}" as completed`}
        />
      </label>

      {!isEditing && (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            if (!processing) {
              setIsEditing(true);
            }
          }}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (!processing) {
                setIsEditing(true);
              }
            }
          }}
          role="textbox"
          aria-readonly="true"
          aria-label={`Todo title: ${todo.title}`}
        >
          {todo.title}
        </span>
      )}

      {isEditing && (
        <input
          data-cy="TodoTitleField"
          className="todo__title-field"
          ref={inputRef}
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          onBlur={saveEditing}
          onKeyDown={handleKeyDown}
          disabled={processing}
          aria-label="Edit todo title"
        />
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => onDelete(todo.id)}
          disabled={processing}
          aria-label={`Delete todo ${todo.title}`}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal', 'overlay', {
          'is-active': processing,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
