import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/types';
import { useTodoContext } from '../context/TodoContext';
import classNames from 'classnames';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { dispatch } = useTodoContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleToggleStatus = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } });
  };

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditedTitle(todo.title);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
  };

  const handleSaveEdit = () => {
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } });
    }

    if (trimmedTitle !== todo.title.trim()) {
      dispatch({
        type: 'UPDATE_TODO_TITLE',
        payload: { id: todo.id, title: trimmedTitle },
      });
    }

    setIsEditing(false);
  };

  const handleEditKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      handleCancelEditing();
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveEdit();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggleStatus}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            ref={editInputRef}
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleEditKeyDown}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleStartEditing}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
