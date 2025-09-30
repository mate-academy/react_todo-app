import React, { useState } from 'react';
import { Todo, useTodos } from '../Сontext/TodosContext';

type Props = {
  todo: Todo;
  onDelete?: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onDelete }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(todo.id);
    } else {
      deleteTodo(todo.id);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(todo.title);
    }
  };

  const handleSubmit = () => {
    const trimmed = editTitle.trim();

    if (!trimmed) {
      handleDelete();
    } else {
      updateTodo(todo.id, trimmed);
    }

    setIsEditing(false);
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      {isEditing ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          onKeyUp={handleKeyUp}
          autoFocus
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDelete}
        >
          ×
        </button>
      )}
    </div>
  );
};
