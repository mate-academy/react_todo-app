import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../interfaces/Todo';
import classNames from 'classnames';

interface Props {
  todo: Todo;
  editTodo: (id: number, newTitle: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  editTodo,
  deleteTodo,
  toggleTodo,
}) => {
  const [inputValue, setInputValue] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue === '') {
      deleteTodo(todo.id);
    } else {
      editTodo(todo.id, inputValue);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (e.key === 'Escape') {
      setInputValue(todo.title);
      editTodo(id, todo.title);
    }
  };

  const handleBlur = (value: string) => {
    if (value !== todo.title) {
      editTodo(todo.id, value);
      setIsEditing(false);
    }

    if (!value) {
      deleteTodo(todo.id);
    }

    setInputValue(todo.title);
    setIsEditing(false);
  };

  return (
    <>
      <div
        data-cy="Todo"
        className={classNames(`todo ${todo.completed ? 'completed' : ''}`)}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onClick={() => toggleTodo(todo.id)}
          />
        </label>

        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={inputValue}
              onBlur={() => handleBlur(inputValue)}
              onKeyDown={e => handleKeyDown(e, todo.id)}
              onChange={e => setInputValue(e.target.value)}
              ref={inputRef}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={handleDoubleClick}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
            >
              ×
            </button>
          </>
        )}
      </div>
    </>
  );
};
