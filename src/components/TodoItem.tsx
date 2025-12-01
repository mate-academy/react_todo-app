import cn from 'classnames';
import { Todo } from '../types/Todo';
import { useEffect, useRef, useState } from 'react';

interface Props {
  todo: Todo;
  handleCompletedChange: (id: number) => void;
  loading?: boolean;
  deleteTodo: (id: number) => void;
  renamingTodo: (todo: Todo) => void;
  isSelected: Todo | null;
  handleUpdate: (
    e: React.KeyboardEvent<HTMLInputElement> | null,
    todo: Todo,
  ) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  handleCompletedChange,
  loading = false,
  deleteTodo,
  renamingTodo,
  isSelected,
  handleUpdate,
}) => {
  const [value, setValue] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSelected?.id === todo.id) {
      inputRef.current?.focus();
    }
  }, [isSelected, todo.id]);

  useEffect(() => {
    setValue(todo.title);
  }, [todo.title]);

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleCompletedChange(todo.id)}
          disabled={loading}
        />
      </label>

      {isSelected?.id === todo.id && (
        <input
          data-cy="TodoTitleField"
          className="todo__title"
          type="text"
          onChange={e => setValue(e.target.value)}
          value={value}
          onKeyDown={e => handleUpdate(e, { ...todo, title: value })}
          onBlur={() => handleUpdate(null, { ...todo, title: value })}
          ref={inputRef}
          disabled={loading}
        />
      )}

      {isSelected?.id !== todo.id && (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            renamingTodo(todo);
          }}
        >
          {todo.title}
        </span>
      )}

      {/* Remove button appears only on hover */}
      {isSelected?.id !== todo.id && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => {
            deleteTodo(todo.id);
          }}
          disabled={loading}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', { 'is-active': loading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
