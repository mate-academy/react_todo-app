/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef } from 'react';
import { Todo } from '../../types/Todo';
import { useTodos } from '../../context/TodosContext';

type TodoItemState = 'view' | 'editing' | 'saving';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { updateTodo, deleteTodo, editTodo, loadingTodoIds, onFocusInput } =
    useTodos();
  const [state, setState] = useState<TodoItemState>('view');
  const [editingTitle, setEditingTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasEditingRef = useRef<boolean>(false);

  const isTempTodo = todo.id === 0;
  const isProcessing = loadingTodoIds.has(todo.id);
  const isLoading = state === 'saving' || isTempTodo || isProcessing;
  const isEditing = state === 'editing';
  const showEditor = isEditing || (state === 'saving' && wasEditingRef.current);

  const saveEdit = () => {
    const trimmedTitle = editingTitle.trim();

    if (trimmedTitle === todo.title) {
      setState('view');
      wasEditingRef.current = false;

      return;
    }

    if (!trimmedTitle) {
      setState('saving');
      deleteTodo(todo.id)
        .then(() => onFocusInput())
        .catch(() => setState('editing'));
      wasEditingRef.current = false;

      return;
    }

    setState('saving');
    editTodo(todo.id, trimmedTitle)
      .then(() => {
        setState('view');
        onFocusInput();
        wasEditingRef.current = false;
      })
      .catch(() => setState('editing'));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setState('view');
      setEditingTitle(todo.title);
      wasEditingRef.current = false;
    }
  };

  const handleDoubleClick = () => {
    wasEditingRef.current = true;
    setState('editing');
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            setState('saving');
            updateTodo(todo.id, !todo.completed)
              .then(() => setState('view'))
              .catch(() => setState('view'));
          }}
          disabled={isLoading}
        />
      </label>

      {!showEditor ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={isLoading ? undefined : handleDoubleClick}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              setState('saving');
              deleteTodo(todo.id)
                .then(() => onFocusInput())
                .catch(() => setState('view'));
            }}
            disabled={isLoading}
          >
            ×
          </button>
        </>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            saveEdit();
          }}
        >
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={e => setEditingTitle(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            disabled={isLoading}
          />
        </form>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${isLoading ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
