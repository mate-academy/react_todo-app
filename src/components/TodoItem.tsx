import React, { useState, useEffect, useRef } from 'react';
import { Todo } from '../types/Todo';
import { TodoLoader } from './TodoLoader';

type Props = {
  todo: Todo;
  toggleTodo: (todo: Todo) => void;
  isLoading: boolean;
  deleteTodo: (todo: number) => void;
  isEditing: boolean;
  startEditing: () => void;
  cancelEditing: () => void;
  updateTodo: (title: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  isLoading,
  deleteTodo,
  isEditing,
  startEditing,
  cancelEditing,
  updateTodo,
}) => {
  const [editingTitle, setEditingTitle] = useState(todo.title);
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      refInput.current?.focus();
      setEditingTitle(todo.title);
    }
  }, [isEditing, todo.title]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateTodo(editingTitle);
  };

  const handleBlur = () => {
    updateTodo(editingTitle);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      cancelEditing();
    }
  };

  const handleDoubleClick = () => {
    startEditing();
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            className="todo__title-field"
            type="text"
            value={editingTitle}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            onChange={e => setEditingTitle(e.target.value)}
            ref={refInput}
            disabled={isLoading}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </span>
      )}

      {/* Remove button appears only on hover */}
      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => {
            deleteTodo(todo.id);
          }}
        >
          ×
        </button>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <TodoLoader isLoading={isLoading} />
    </div>
  );
};
