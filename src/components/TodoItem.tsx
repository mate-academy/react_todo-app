/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { EditForm } from './EditForm';
import { Todo } from '../types/Todo';
import { useDispatch, useHeaderInputRef } from '../hooks/GlobalHooks';
import { DEFAULT_COMPLETED } from '../constants/appConstants';
import cn from 'classnames';
import { ActionType } from '../constants/ActionType';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(DEFAULT_COMPLETED);
  const [editedTitle, setEditedTitle] = useState('');

  const dispatch = useDispatch();
  const headerInputRef = useHeaderInputRef();

  const { completed, id: todoId, title } = todo;

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditedTitle(title);
  };

  const handleEditSubmit = () => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === title) {
      setIsEditing(false);

      if (headerInputRef) {
        headerInputRef.current?.focus();
      }

      return;
    }

    if (!trimmedTitle) {
      dispatch({ type: ActionType.Delete, todoId });

      if (headerInputRef) {
        headerInputRef.current?.focus();
      }

      return;
    }

    dispatch({
      type: ActionType.Update,
      updatedTodo: { ...todo, title: trimmedTitle },
    });

    if (headerInputRef) {
      headerInputRef.current?.focus();
    }

    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch({ type: ActionType.Delete, todoId });

    if (headerInputRef) {
      headerInputRef.current?.focus();
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() =>
            dispatch({
              type: 'updateTodo',
              updatedTodo: { ...todo, completed: !completed },
            })
          }
        />
      </label>

      {isEditing ? (
        <EditForm
          value={editedTitle}
          onValueChange={setEditedTitle}
          changeEditing={setIsEditing}
          onSubmit={handleEditSubmit}
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleStartEditing}
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
      )}
    </div>
  );
};
