import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { useTodo } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { updateTodo, toggleTodo, deleteTodo } = useTodo();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleSave = () => {
    const trimmedText = editText.trim();

    // якщо текст порожній, видаляємо завдання
    if (!trimmedText) {
      deleteTodo(todo.id);

      return;
    }

    // якщо текст змінився, оновлюємо
    if (trimmedText !== todo.title) {
      updateTodo(todo.id, { title: trimmedText });
    }

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
        <input
          type="text"
          className="todo__title-field"
          data-cy="TodoTitleField"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="todo__view">
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
          <button
            data-cy="TodoDelete"
            type="button"
            className="todo__remove"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
