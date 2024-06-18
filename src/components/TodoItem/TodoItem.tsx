import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  onDelete: () => void;
  onToggle: () => void;
  onUpdate: (newTitle: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onToggle,
  onUpdate,
}) => {
  const [value, setValue] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const saveChanges = () => {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      onUpdate(trimmedValue);
    } else {
      onDelete();
    }

    setIsEditing(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveChanges();
  };

  const handleBlur = () => {
    saveChanges();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setValue(todo.title);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const { title, completed } = todo;

  return (
    <>
      <div
        data-cy="Todo"
        className={classNames('todo', {
          completed: completed,
        })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={onToggle}
          />
        </label>

        {!isEditing ? (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setIsEditing(true)}
            >
              {title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={onDelete}
            >
              ×
            </button>
          </>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyUp={handleKeyUp}
              ref={inputRef}
            />
          </form>
        )}
      </div>
    </>
  );
};
