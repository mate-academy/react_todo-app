/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { useTodos } from '../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, toggleTodo, renameTodo } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  const isCanceling = useRef(false);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (isCanceling.current) {
      isCanceling.current = false;

      return;
    }

    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      deleteTodo(todo.id);
    } else if (trimmedTitle !== todo.title) {
      renameTodo(todo.id, trimmedTitle);
    }

    setIsEditing(false);
  };

  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
    >
      <label
        className="todo__status-label"
        style={isEditing ? { opacity: 0, pointerEvents: 'none' } : {}}
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSave} style={{ display: 'contents' }}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={inputRef}
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            onBlur={handleSave}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                isCanceling.current = true;
                setNewTitle(todo.title);
                setIsEditing(false);
              }
            }}
          />
        </form>
      ) : (
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
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
