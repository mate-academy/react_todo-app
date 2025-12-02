import { Todo } from '../types/Todo';
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

interface Props {
  todo: Todo;
  handleCompletedChange: (id: number) => void;
  deleteTodo: (id: number) => void;
  renamingTodo: (todo: Todo) => void;
  isSelected: Todo | null;
  handleUpdate: (
    e: React.KeyboardEvent<HTMLInputElement> | null,
    todo: Todo,
  ) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo: { title, id, completed, userId },
  handleCompletedChange,
  deleteTodo,
  renamingTodo,
  isSelected,
  handleUpdate,
}) => {
  const [value, setValue] = useState(title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSelected?.id === id) {
      inputRef.current?.focus();
    }
  }, [isSelected, id]);

  useEffect(() => {
    setValue(title);
  }, [title]);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => handleCompletedChange(id)}
        />
      </label>

      {isSelected?.id === id && (
        <input
          data-cy="TodoTitleField"
          className="todo__title"
          type="text"
          onChange={e => setValue(e.target.value)}
          value={value}
          onKeyDown={e =>
            handleUpdate(e, { userId, id, completed, title: value })
          }
          onBlur={() =>
            handleUpdate(null, { userId, id, completed, title: value })
          }
          ref={inputRef}
        />
      )}

      {isSelected?.id !== id && (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            renamingTodo({ title, id, completed, userId });
          }}
        >
          {title}
        </span>
      )}

      {/* Remove button appears only on hover */}
      {isSelected?.id !== id && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => {
            deleteTodo(id);
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};
