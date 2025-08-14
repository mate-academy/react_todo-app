import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { ErrorMessages } from '../types/ErrorMessages';

type Props = {
  todo: Todo;
  deleteTodo: (todoId: number) => void;
  isTemp?: boolean;
  isLoading?: boolean;
  updateTodo?: (todo: Todo) => void;
  setErrorMessage?: (message: ErrorMessages) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  isLoading,
  updateTodo,
  setErrorMessage = () => {},
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const { id, completed, title } = todo;

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEditSubmit = async () => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === '') {
      setEditedTitle(todo.title);
      // setIsEditing(false);
      deleteTodo(todo.id);

      return;
    }

    if (trimmedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (editedTitle !== todo.title) {
      try {
        await updateTodo?.({ ...todo, title: editedTitle.trim() });
        setIsEditing(false);
      } catch {
        setErrorMessage?.(ErrorMessages.updateError);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEditSubmit();
    }

    if (event.key === 'Escape') {
      setEditedTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      key={id}
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label htmlFor={todo.id.toString()} className="todo__status-label">
        {''}
        <input
          id={todo.id.toString()}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => updateTodo?.({ ...todo, completed: !completed })}
          readOnly
        />
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          className="todo__title-field"
          value={editedTitle}
          data-cy="TodoTitleField"
          onChange={e => setEditedTitle(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setIsEditing(true);
            setEditedTitle(todo.title);
          }}
        >
          {title}
        </span>
      )}

      {/* Remove button appears only on hover */}
      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(todo.id)}
          disabled={isLoading}
        >
          ×
        </button>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={`modal overlay${isLoading ? ' is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
