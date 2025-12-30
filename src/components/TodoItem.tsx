import React, { useState } from 'react';
import { Todo } from '../types/ Todo';
import { useTodos } from '../context/ TodosContext';
import { useTodosHandlers } from '../handlers/todosHandlers';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { loadingIds } = useTodos();
  const isLoading = loadingIds.includes(todo.id);

  const {
    isEditing,
    handleToggle,
    handleDelete,
    handleStartEdit,
    handleSubmitEdit,
    handleCancelEdit,
  } = useTodosHandlers({ id: todo.id, title: todo.title });

  const [editValue, setEditValue] = useState(todo.title);

  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''} ${isLoading ? 'loading' : ''}`}
    >
      <label className="todo__status-label" htmlFor={`todo-status-${todo.id}`}>
        <span className="visually-hidden">Toggle todo status</span>
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

      {!isEditing && (
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
      )}

      {isEditing && (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmitEdit(editValue);
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onBlur={() => handleSubmitEdit(editValue)}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                handleCancelEdit();
                setEditValue(todo.title);
              }
            }}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};
