import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useTodos } from '../TodosContext';
import { Todo } from '../types/Todo';
import { useFocus } from '../FocusContext';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(title);
  const { focusInput } = useFocus();

  const handleEdit = () => setIsEditing(true);
  const handleBlur = () => {
    if (editText.trim()) {
      updateTodo(id, editText.trim());
    } else {
      deleteTodo(id);
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
      setEditText(title);
    }
  };

  const handleDelete = () => {
    deleteTodo(id);
    focusInput();
  };

  useEffect(() => {
    if (!isEditing) {
      focusInput();
    }
  }, [isEditing, focusInput]);

  return (
    <li className={classNames('todo', { completed })} data-cy="Todo">
      <label className="todo__status-label">
        <input
          id={`todo-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => toggleTodo(id)}
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
            {title}
          </span>
          <button
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
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
