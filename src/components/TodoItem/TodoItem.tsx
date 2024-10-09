import { useCallback, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { useTodoContext } from '../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo: { id, title, completed } }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');
  const renameInputRef = useRef<HTMLInputElement | null>(null);
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const { toggleTodoStatus, updateTodoTitle, deleteTodo } = useTodoContext();

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (!isEditing) {
        return;
      }

      if (editingTitle.trim() === '') {
        deleteTodo(id);
      } else {
        updateTodoTitle(id, editingTitle);
      }

      setIsEditing(false);
    },
    [deleteTodo, editingTitle, id, isEditing, updateTodoTitle],
  );

  const handleOnBlur = useCallback(
    (event: React.FormEvent) => {
      handleSubmit(event);
    },
    [handleSubmit],
  );

  const handleEscapeUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (isEditing && renameInputRef.current) {
      renameInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      key={id}
      data-cy="Todo"
      className={`todo ${completed ? 'completed' : ''}`}
    >
      {isEditing ? (
        <>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              ref={checkboxRef}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={completed}
              onChange={() => toggleTodoStatus(id)}
            />
          </label>

          {/* This form is shown instead of the title and remove button */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="TodoTitleField"
              ref={renameInputRef}
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editingTitle}
              onChange={e => setEditingTitle(e.target.value)}
              onBlur={handleOnBlur}
              onKeyUp={handleEscapeUp}
            />
          </form>
        </>
      ) : (
        <>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label" htmlFor={`todo-${id}`}>
            <input
              data-cy="TodoStatus"
              id={`todo-${id}`}
              type="checkbox"
              className="todo__status"
              checked={completed}
              onChange={() => toggleTodoStatus(id)}
            />
          </label>

          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEditing(true);
              setEditingTitle(title);
            }}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
