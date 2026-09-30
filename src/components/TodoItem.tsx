/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useTodos } from '../context/TodosContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, toggleTodo, updateTodoTitle } = useTodos();
  const { id, title, completed } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const startEditing = () => {
    setDraftTitle(title);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftTitle(title);
    setIsEditing(false);
  };

  const saveChanges = () => {
    const trimmedTitle = draftTitle.trim();

    setIsEditing(false);

    if (!trimmedTitle) {
      deleteTodo(id);

      return;
    }

    if (trimmedTitle !== title) {
      updateTodoTitle(id, trimmedTitle);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveChanges();
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      <label className="todo__status-label" htmlFor={`todo-status-${id}`}>
        <input
          id={`todo-status-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => toggleTodo(id)}
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
            value={draftTitle}
            onChange={event => setDraftTitle(event.target.value)}
            onBlur={saveChanges}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={startEditing}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
