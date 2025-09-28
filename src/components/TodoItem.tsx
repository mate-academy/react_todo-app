import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { useTodos } from '../context/TodosContext';

type Props = {
  todo: Todo;
  isTemp?: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo: { completed, id, title },
  isTemp = false,
}) => {
  const {
    value: { setTodos },
    loadingTodoIds,
    deletingTodoIds,
    handleDelete,
    handleRename,
    setError,
    onToggleStatus,
  } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isSaving, setIsSaving] = useState(false);
  const editInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => editInputRef.current?.focus(), 0);
    }
  }, [isEditing]);

  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const saveTitle = async () => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === title) {
      setIsEditing(false);

      return;
    }

    if (!trimmedTitle) {
      try {
        setIsSaving(true);
        setIsEditing(false);
        await handleDelete(id);
      } catch {
        setError('Unable to delete a todo');
        setTimeout(() => setError(''), 3000);
        editInputRef.current?.focus();
      } finally {
        setIsSaving(false);
      }

      return;
    }

    setIsEditing(false);

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo,
      ),
    );

    setEditedTitle(trimmedTitle);
    try {
      setIsSaving(true);
      await handleRename(id, trimmedTitle);
    } catch {
      setError('Unable to update a todo');
      editInputRef.current?.focus();
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await saveTitle();
  };

  const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={`todo ${completed ? 'completed' : ''}`}
      key={id}
    >
      <label className="todo__status-label" htmlFor={`todo-status-${id}`}>
        {/* {} */}
        <input
          id={`todo-status-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {
            onToggleStatus(id, !completed);
          }}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            ref={editInputRef}
            type="text"
            data-cy="TodoTitleField"
            className="todo__title-field"
            value={editedTitle}
            onChange={handleTitleChange}
            onKeyUp={handleKeyUp}
            onBlur={saveTitle}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {editedTitle}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleDelete(id)}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${isTemp || deletingTodoIds.includes(id) || isSaving || loadingTodoIds.includes(id) ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
