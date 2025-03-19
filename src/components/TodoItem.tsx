import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useTodoContext } from '../TodoContext';
import { Todo } from '../types/Todo';

export const TodoItem: React.FC<{ todo: Todo; loading?: boolean }> = ({
  todo,
}) => {
  const {
    handleDeleteTodo,
    handleStatusTodo,
    handleUpdateTodo,
    setError,
    processingIds,
  } = useTodoContext();

  const { completed, title, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setNewTitle(title);
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    setIsSubmitting(true);

    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === title) {
      setIsEditing(false);
      setIsSubmitting(false);

      return;
    }

    if (!trimmedTitle) {
      handleDeleteTodo(id);
      setIsSubmitting(false);

      return;
    }

    const resp = await handleUpdateTodo(todo, trimmedTitle);

    if (resp) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setNewTitle(trimmedTitle);
      setError('Unable to update a todo');
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleBlur = () => {
    if (!isSubmitting) {
      handleSubmit();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(title);
    }
  };

  const isProcessing = processingIds.includes(todo.id);

  return (
    <div>
      <div
        key={todo.id}
        data-cy="Todo"
        className={classNames('todo', { completed: completed })}
        onDoubleClick={handleDoubleClick}
      >
        <label className="todo__status-label" aria-label="status">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onClick={() => handleStatusTodo(todo)}
          />
        </label>
        {isEditing ? (
          <input
            onSubmit={handleSubmit}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={handleBlur}
            ref={inputRef}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>
        )}
        {!isEditing && (
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo.id)}
            style={{ display: isEditing ? 'none' : 'block' }}
            disabled={isProcessing}
          >
            {isProcessing ? '' : '×'}
          </button>
        )}
      </div>
    </div>
  );
};
