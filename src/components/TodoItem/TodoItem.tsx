/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../TodoContext';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext must be used within TodoProvider');
  }

  const { toggleTodo, removeTodo, updateTodoTitle } = context;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const isEscaped = useRef(false);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    isEscaped.current = false;
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const saveEdit = () => {
    updateTodoTitle(todo.id, editTitle);
    setIsEditing(false);
  };

  const handleBlur = () => {
    if (isEscaped.current) {
      isEscaped.current = false;

      return;
    }

    if (isEditing) {
      saveEdit();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      isEscaped.current = true;
      setIsEditing(false);
      setEditTitle(todo.title);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveEdit();
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => removeTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
