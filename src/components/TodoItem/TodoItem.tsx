/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../type/Todo';

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, title: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onToggle,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const isEscaping = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  function saveEdit() {
    if (isEscaping.current) {
      isEscaping.current = false;

      return;
    }

    if (editTitle.trim() === '') {
      onDelete(todo.id);
    } else {
      onEdit(todo.id, editTitle.trim());
    }

    setIsEditing(false);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      isEscaping.current = true;
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveEdit();
  }

  function handleDoubleClick() {
    setEditTitle(todo.title); // синхронізуємо актуальний title
    setIsEditing(true);
  }

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={event => handleSubmit(event)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={event => setEditTitle(event.target.value)}
            onBlur={saveEdit}
            onKeyUp={handleKeyUp}
            ref={inputRef}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </span>
      )}

      {/* Remove button appears only on hover */}
      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => onDelete(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
