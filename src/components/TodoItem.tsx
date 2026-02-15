import React, { useState, useRef, useEffect } from 'react';
import { Todo, useTodos } from '../context/TodoContext';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(todo.title);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    updateTodo(todo.id, tempTitle);
    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setTempTitle(todo.title);
      setIsEditing(false);
    }

    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div
      className={`todo ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
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
          type="text"
          className="todo__title-field"
          style={{ width: '100%', boxSizing: 'border-box' }}
          value={tempTitle}
          onChange={e => setTempTitle(e.target.value)}
          onBlur={handleSubmit}
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
