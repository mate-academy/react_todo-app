/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { DispathContext, InputContext } from '../GlobalContext/GlobalContext';
import { Todo } from '../../type/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const dispatch = useContext(DispathContext);
  const inputFocus = useContext(InputContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleBlur = () => {
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle.length === 0) {
      dispatch({ type: 'deleteTodo', payload: id });
    } else {
      dispatch({ type: 'editTodo', payload: { id, title: trimmedTitle } });
    }

    setIsEditing(false);
  };

  const onDlbClick = () => {
    setIsEditing(true);
  };

  const onDelete = () => {
    dispatch({ type: 'deleteTodo', payload: id });
  };

  const onChangeStatus = () => {
    dispatch({ type: 'updateComplete', playload: { id, completed } });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    }

    if (event.key === 'Escape') {
      setEditTitle(title);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputFocus?.current?.focus();
    }
  }, [isEditing, inputFocus]);

  return (
    <>
      <div
        data-cy="Todo"
        className={classNames('todo', { completed: completed })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            onClick={onChangeStatus}
            checked={completed}
          />
        </label>

        {isEditing ? (
          <input
            ref={inputFocus}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={onDlbClick}
          >
            {title}
          </span>
        )}

        {!isEditing && (
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={onDelete}
          >
            ×
          </button>
        )}
      </div>
    </>
  );
};
