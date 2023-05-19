import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { ErrorType } from '../../types/Error';

type Props = {
  todo: Todo;
  isLoading: boolean;
  error: ErrorType;
  removeTodo: (todoId: number) => void;
  updateTodo: (todoId: number, updatedData: Partial<Todo>) => void;
};

export const TodoTask: FC<Props> = React.memo(({
  todo,
  isLoading,
  removeTodo,
  updateTodo,
  error,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState(todo.title);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleOnClickRemoveTodo = () => removeTodo(todo.id);

  const handleOnClickToggleTodoStatus = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleDoubleClickTask = () => setIsEditing(true);

  const handleOnChangeTitleTask = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setQuery(event.target.value);

  const updateTitle = () => {
    if (!query.trim()) {
      removeTodo(todo.id);

      return;
    }

    if (query === todo.title) {
      setIsEditing(false);

      return;
    }

    updateTodo(todo.id, { title: query });
    setIsEditing(false);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateTitle();
  };

  const handleOnBlur = () => {
    updateTitle();
  };

  const handleOnEsc = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Escape') {
      return;
    }

    setIsEditing(false);
    setQuery(todo.title);
  };

  useEffect(() => {
    if (error === ErrorType.UPDATE) {
      setQuery(todo.title);
    }
  }, [error]);

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={classNames('todo',
        {
          completed: todo.completed,
        })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onChange={handleOnClickToggleTodoStatus}
          checked={todo.completed}
        />
      </label>

      {isEditing
        ? (
          <form onSubmit={handleOnSubmit}>
            <input
              ref={editInputRef}
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={query}
              onChange={handleOnChangeTitleTask}
              onBlur={handleOnBlur}
              onKeyUp={handleOnEsc}
            />
          </form>
        )
        : (
          <>
            <span
              className="todo__title"
              onDoubleClick={handleDoubleClickTask}
            >
              {todo.title}
            </span>
            <button
              type="button"
              className="todo__remove"
              onClick={handleOnClickRemoveTodo}
              data-cy="deleteTodo"
            >
              ×
            </button>
          </>
        )}

      <div className={classNames('modal overlay', {
        'is-active': isLoading,
      })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});
