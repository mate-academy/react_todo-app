import React, { useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { useDispatch } from '../../GlobalProvider';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const dispatch = useDispatch();

  const handleEditedTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditedTitle(event.target.value);
  };

  const saveChanges = () => {
    const trimmedEditedTitle = editedTitle.trim();

    if (!trimmedEditedTitle) {
      dispatch({ type: 'deleteTodo', payload: todo.id });
      setIsEditing(false);

      return;
    }

    dispatch({
      type: 'updateTodo',
      payload: { id, completed, title: trimmedEditedTitle },
    });
    setIsEditing(false);
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveChanges();
  };

  const handleEscapeKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() =>
            dispatch({
              type: 'updateTodo',
              payload: { id, title, completed: !completed },
            })
          }
        />
      </label>

      {!isEditing && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch({ type: 'deleteTodo', payload: id })}
          >
            ×
          </button>
        </>
      )}

      {isEditing && (
        <form onSubmit={handleEditSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={handleEditedTitleChange}
            autoFocus
            onKeyUp={handleEscapeKeyUp}
            onBlur={saveChanges}
          />
        </form>
      )}
    </div>
  );
};
