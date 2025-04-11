/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { useContext, useState, useRef, useEffect } from 'react';
import { TodoContex } from './Contex';

export const TodoItem = ({ todo: { id, title, completed } }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const { onDelete, completedChecked, renameTodo } = useContext(TodoContex);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleRename = () => {
    const trimmed = newTitle.trim();

    if (trimmed === '') {
      onDelete(id);
    } else {
      renameTodo(id, trimmed);
    }

    setIsEditing(false);
  };

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => completedChecked(id)}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleRename();
          }}
        >
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={handleRename}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                setNewTitle(title);
                setIsEditing(false);
              }

              if (e.key === 'Enter') {
                handleRename();
              }
            }}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </span>
      )}

      {!isEditing && (
        <button
          onClick={() => onDelete(id)}
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
        >
          ×
        </button>
      )}
    </div>
  );
};
