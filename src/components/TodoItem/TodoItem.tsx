/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/types';
import { useTodoContext } from '../../TodoProvider';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { handleUpdate, deleteTodo, toggleTodo } = useTodoContext();

  const { id, completed, title } = todo;

  const [editingTitle, setEditingTitle] = useState(title);
  const [isTodoEditing, setIsTodoEditing] = useState<boolean>(false);

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const normalizedTitle = editingTitle.trim();

    if (normalizedTitle === title) {
      setIsTodoEditing(false);

      return;
    }

    if (!normalizedTitle) {
      deleteTodo(id);

      return;
    }

    handleUpdate(normalizedTitle, id);
    setIsTodoEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsTodoEditing(false);
      setEditingTitle(title);
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => toggleTodo(id)}
        />
      </label>

      {!isTodoEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsTodoEditing(true)}
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
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={editingTitle}
            onChange={event => setEditingTitle(event.target.value)}
            onBlur={() => handleSubmit()}
            onKeyUp={handleKeyUp}
          />
        </form>
      )}
    </div>
  );
};
