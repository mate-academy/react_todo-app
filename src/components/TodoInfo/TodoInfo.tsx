/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  editingTodoId: number | null;
  onEdit: (todoId: number | null) => void;
  onUpdate: (id: number, data: Partial<Todo>) => void;
  onRemove: (todoId: number) => void;
}

const TodoInfoComponent: React.FC<Props> = ({
  todo,
  editingTodoId,
  onEdit,
  onUpdate,
  onRemove,
}) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const editFieldRef = useRef<HTMLInputElement>(null);
  const isEditing = editingTodoId === todo.id;

  useEffect(() => {
    setNewTitle(todo.title);
  }, [todo.title]);

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = useCallback(() => {
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === todo.title) {
      onEdit(null);

      return;
    }

    if (!trimmedTitle) {
      onRemove(todo.id);
    } else {
      onUpdate(todo.id, { title: trimmedTitle });
    }

    onEdit(null);
  }, [newTitle, todo, onEdit, onRemove, onUpdate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEdit(null);
        setNewTitle(todo.title);
      }
    },
    [onEdit, todo.title],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSave();
    },
    [handleSave],
  );

  const handleToggle = useCallback(() => {
    onUpdate(todo.id, { completed: !todo.completed });
  }, [onUpdate, todo.id, todo.completed]);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggle}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={editFieldRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => onEdit(todo.id)}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onRemove(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export const TodoInfo = React.memo(TodoInfoComponent);
