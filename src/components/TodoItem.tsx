import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useTodos, Todo } from '../context/TodoContext';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(todo.title);
  const isCanceled = useRef(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      isCanceled.current = false;
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEditSubmit = () => {
    if (isCanceled.current) {
      return;
    }

    const trimmed = tempTitle.trim();

    if (!trimmed) {
      deleteTodo(todo.id);
    } else if (trimmed !== todo.title) {
      updateTodo(todo.id, trimmed);
    }

    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      isCanceled.current = true;
      setIsEditing(false);
      setTempTitle(todo.title);
    } else if (e.key === 'Enter') {
      handleEditSubmit();
    }
  };

  return (
    <div
      className={classNames('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
      data-cy="Todo"
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          data-cy="TodoStatus"
        />
      </label>

      {isEditing ? (
        <input
          ref={editInputRef}
          className="todo__title-field"
          value={tempTitle}
          onChange={e => setTempTitle(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyUp={handleKeyUp}
          data-cy="TodoTitleField"
        />
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
            data-cy="TodoTitle"
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => deleteTodo(todo.id)}
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
