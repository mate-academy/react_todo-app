import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/ Todo';
import { useTodos } from '../context/TodosContext';
import { useTodosHandlers } from '../hooks/useTodosHandlers';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { loadingIds } = useTodos();
  const isLoading = loadingIds.includes(todo.id);

  const {
    isEditing,
    currentTitle,
    handleToggle,
    handleDelete,
    handleStartEdit,
    handleSubmitEdit,
    handleCancelEdit,
  } = useTodosHandlers({ id: todo.id });

  const [editValue, setEditValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditValue(currentTitle);
      inputRef.current?.focus();
    }
  }, [isEditing, currentTitle]);

  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''} ${isLoading ? 'loading' : ''}`}
    >
      <label
        className="todo__status-label"
        htmlFor={`todo-status-${todo.id}`}
        aria-label="Toggle todo status"
      >
        <input
          id={`todo-status-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={isLoading}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleStartEdit}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
            disabled={isLoading}
          >
            ×
          </button>
        </>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmitEdit(editValue);
          }}
        >
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onBlur={() => handleSubmitEdit(editValue)}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                handleCancelEdit();
                setEditValue(currentTitle);
              }
            }}
          />
        </form>
      )}
    </div>
  );
};
