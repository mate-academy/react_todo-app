/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  onDelete: (v: number) => void;
  onUpdate: (v: Todo[]) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onDelete, onUpdate }) => {
  const [isFormActive, setIsFormActive] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(todo.title);

  const editInputRef = useRef<HTMLInputElement | null>(null);

  const updateHandler = useCallback(() => {
    const trimTitle = updateTitle.trim();

    if (todo.title === trimTitle) {
      setIsFormActive(false);

      return;
    }

    if (!trimTitle) {
      onDelete(todo.id);

      return;
    }

    onUpdate([{ ...todo, title: trimTitle }]);
    setIsFormActive(false);
    editInputRef.current?.focus();
  }, [todo, updateTitle, onUpdate, onDelete]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFormActive(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() =>
              onUpdate?.([{ ...todo, completed: !todo.completed }])
            }
          />
        </label>

        {!isFormActive ? (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setIsFormActive(true);
              }}
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => {
                onDelete?.(todo.id);
              }}
            >
              ×
            </button>
          </>
        ) : (
          <form
            onSubmit={event => {
              event.preventDefault();
              updateHandler();
            }}
          >
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              autoFocus
              ref={editInputRef}
              value={updateTitle}
              onChange={event => setUpdateTitle(event.target.value)}
              onBlur={updateHandler}
            />
          </form>
        )}
      </div>
    </>
  );
};
