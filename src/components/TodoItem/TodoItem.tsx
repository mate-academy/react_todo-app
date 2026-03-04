import React, { useEffect } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useDispatch } from '../../context/GlobalProvider';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const submittedRef = React.useRef<boolean>(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(todo.title);

  useEffect(() => {
    setEditedTitle(todo.title);
  }, [todo.title]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    } else {
      submittedRef.current = false;
    }
  }, [isEditing]);

  const startEditing = () => {
    setIsEditing(true);
  };

  const finishEditing = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  const submitEdit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (submittedRef.current) {
      return;
    }

    submittedRef.current = true;

    const trimmed = editedTitle.trim();

    if (!trimmed) {
      dispatch({ type: 'delete', payload: todo.id });
    }

    if (trimmed === todo.title) {
      submittedRef.current = false;
      finishEditing();

      return;
    }

    dispatch({ type: 'edit', payload: { ...todo, title: trimmed } });
    submittedRef.current = false;
    finishEditing();
  };

  const handleBlur = () => {
    if (!submittedRef.current) {
      submitEdit();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      finishEditing();
    }

    if (e.key === 'Enter') {
      submitEdit();
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={() => dispatch({ type: 'update', payload: todo })}
        />
      </label>

      {isEditing ? (
        <form onSubmit={submitEdit} onBlur={handleBlur}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={event => setEditedTitle(event.target.value)}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={startEditing}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch({ type: 'delete', payload: todo.id })}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
