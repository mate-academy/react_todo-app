/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';
import { EditForm } from './EditForm';
import { useDispatch, useInputRef } from '../hooks/GlobalHooks';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  const dispatch = useDispatch();
  const inputRef = useInputRef();
  const { completed, id: todoId, title } = todo;

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditedTitle(title);
  };

  const handleEditSubmit = () => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === title) {
      setIsEditing(false);

      if (inputRef) {
        inputRef.current?.focus();
      }

      return;
    }

    if (!trimmedTitle) {
      dispatch({ type: 'deleteTodo', todoId });

      if (inputRef) {
        inputRef.current?.focus();
      }

      return;
    }

    dispatch({
      type: 'updateTodo',
      updatedTodo: { ...todo, title: trimmedTitle },
    });

    if (inputRef) {
      inputRef.current?.focus();
    }

    setIsEditing(false);
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
            onClick={() => dispatch({ type: 'deleteTodo', todoId })}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
