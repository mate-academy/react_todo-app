import React, { useState, useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface State {
  data: Todo;
  onUpdate: (title: string, id: number) => void;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem: React.FC<State> = ({
  data,
  onUpdate,
  onToggle,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState<string>(data.title);
  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputField.current?.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | null = null) => {
    e?.preventDefault();
    setIsEditing(false);

    if (title.trim().length === 0) {
      onDelete();
    } else {
      onUpdate(title.trim(), data.id);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      setTitle(data.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: data.completed })}
    >
      <label className="todo__status-label" htmlFor={`checkbox_${data.id}`}>
        <input
          id={`checkbox_${data.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={data.completed}
          aria-label="Toggle todo status"
          onChange={() => onToggle()}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEditing(true);
            }}
          >
            {data.title}
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
        <form onSubmit={e => handleSubmit(e)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyUp={e => handleKeyUp(e)}
            onBlur={() => handleSubmit()}
            ref={inputField}
          />
        </form>
      )}
    </div>
  );
};
