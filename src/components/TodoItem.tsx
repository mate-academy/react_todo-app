import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { useTodos } from '../context/TodoContext';

type Props = { todo: Todo };

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggle, remove, rename } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const savingRef = useRef(false);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const save = async () => {
    if (savingRef.current) {
      return;
    }

    savingRef.current = true;

    const trimmed = draft.trim();

    if (trimmed === '') {
      setPendingDelete(true);
      try {
        await rename(todo.id, '');
        setIsEditing(false);
      } finally {
        setPendingDelete(false);
        savingRef.current = false;
      }

      return;
    }

    if (trimmed === todo.title) {
      setIsEditing(false);
      savingRef.current = false;

      return;
    }

    setPendingUpdate(true);
    try {
      await rename(todo.id, trimmed);
      setIsEditing(false);
    } finally {
      setPendingUpdate(false);
      savingRef.current = false;
    }
  };

  const handleToggle = async () => {
    setPendingUpdate(true);
    try {
      await toggle(todo.id);
    } finally {
      setPendingUpdate(false);
    }
  };

  const handleDelete = async () => {
    setPendingDelete(true);
    try {
      await remove(todo.id);
    } finally {
      setPendingDelete(false);
    }
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => void handleToggle()}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => void handleDelete()}
            disabled={pendingDelete}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={e => e.preventDefault()}>
          <input
            data-cy="TodoTitleField"
            ref={inputRef}
            className="todo__title-field"
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void save();
              }

              if (e.key === 'Escape') {
                setDraft(todo.title);
                setIsEditing(false);
              }
            }}
            onBlur={() => {
              if (!savingRef.current) {
                void save();
              }
            }}
          />
        </form>
      )}

      {(pendingDelete || pendingUpdate) && (
        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
