import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/todo';
import { useTodos } from '../../hooks/useTodos';

type Props = {
  todo: Todo;
};

const TodoItemBase: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { deleteTodo, toggleTodoStatus, updateTodoTitle } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const newTitleRef = useRef<HTMLInputElement | null>(null);

  const handleEditing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTitleDoubleClick = () => {
    setIsEditing(true);
  };

  const updateTodo = () => {
    const titleToSave = newTitle.trim();

    if (titleToSave !== '' && titleToSave !== title) {
      updateTodoTitle(id, titleToSave);
    }

    if (titleToSave === '') {
      deleteTodo(id);
    }

    setIsEditing(false);
  };

  const handleInputBlur = () => {
    updateTodo();
  };

  const handleSubmitTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNewTitle(title);
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('keyup', handleEscape);
    } else {
      document.removeEventListener('keyup', handleEscape);
    }

    return () => {
      document.removeEventListener('keyup', handleEscape);
    };
  }, [isEditing, title]);

  useEffect(() => {
    if (isEditing) {
      newTitleRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label" aria-label="todo-status-label">
        <input
          onChange={() => toggleTodoStatus(id)}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>
      {isEditing ? (
        <form onSubmit={handleSubmitTitle}>
          <input
            ref={newTitleRef}
            value={newTitle}
            onChange={handleEditing}
            onBlur={handleInputBlur}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty Todo will be deleted"
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleTitleDoubleClick}
        >
          {title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(id)}
        >
          ×
        </button>
      )}
    </div>
  );
};

export const TodoItem = React.memo(TodoItemBase);
