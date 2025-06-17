/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/types';
import { ActionType, useDispatch } from '../../globalProvider';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;

  const [editingTitle, setEditingTitle] = useState(title);
  const [isTodoEditing, setIsTodoEditing] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const normalizedTitle = editingTitle.trim();

    if (normalizedTitle === title) {
      setIsTodoEditing(false);

      return;
    }

    if (!normalizedTitle) {
      dispatch({ type: ActionType.Delete, payload: id });

      return;
    }

    dispatch({
      type: ActionType.Update,
      payload: { id: id, title: normalizedTitle },
    });

    setIsTodoEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsTodoEditing(false);
      setEditingTitle(title);
    }
  };

  const handleDelete = () => {
    dispatch({ type: ActionType.Delete, payload: id });
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() =>
            dispatch({
              type: ActionType.Toggle,
              payload: { id: id, status: !completed },
            })
          }
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
            onClick={handleDelete}
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
