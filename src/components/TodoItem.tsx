import React, { useState, useEffect } from 'react';
import { useTodos } from '../TodosContext';
import { Todo } from '../types/Todo';
import { useFocus } from '../FocusContext';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const { focusInput } = useFocus();

  const handleEdit = () => setIsEditing(true);
  const handleBlur = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim());
    } else {
      deleteTodo(todo.id);
      setTimeout(() => focusInput(), 0);
    }

    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
      focusInput();
    }

    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.title);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      focusInput();
    }
  }, [isEditing, focusInput]);

  return (
    <li className={`todo ${todo.completed ? 'completed' : ''}`} data-cy="Todo">
      <label className="todo__status-label">
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          aria-label="Toggle todo status"
        />
      </label>
      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleEdit}
          >
            {todo.title}
          </span>
          <button
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              deleteTodo(todo.id);
              focusInput();
            }}
          >
            ×
          </button>
        </>
      ) : (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={editText}
          onBlur={handleBlur}
          onChange={e => setEditText(e.target.value)}
          onKeyUp={handleKeyUp}
          autoFocus
        />
      )}
    </li>
  );
};
