/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

import React, { useContext, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch, mainInputRef } = useContext(TodoContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const focusMain = () => {
    mainInputRef.current?.focus();
  };

  const handleEdit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const trimmed = editTitle.trim();

    if (!trimmed) {
      dispatch({
        type: 'deleteTodo',
        payload: todo.id,
      });
      setIsEditing(false);
      focusMain();

      return;
    }

    if (trimmed === todo.title) {
      setIsEditing(false);
      focusMain();

      return;
    }

    dispatch({
      type: 'updateTodo',
      payload: {
        id: todo.id,
        title: trimmed,
      },
    });

    setIsEditing(false);
    focusMain();
  };

  const doubleClick = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleRemove = () => {
    dispatch({
      type: 'deleteTodo',
      payload: todo.id,
    });
    focusMain();
  };

  const editInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() =>
            dispatch({
              type: 'toggleTodo',
              payload: todo.id,
            })
          }
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleEdit}>
          <input
            ref={editInputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={event => {
              setEditTitle(event.target.value);
            }}
            onBlur={() => handleEdit()}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setEditTitle(todo.title);
                setIsEditing(false);
              }
            }}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={doubleClick}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleRemove}
        >
          ×
        </button>
      )}
    </div>
  );
};
