/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { useDeleteContext } from '../../contexts/DeleteContext';
import { useUpdateContext } from '../../contexts/UpdateContext';

export type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');

  const { handleDelete } = useDeleteContext();
  const { updateTodo } = useUpdateContext();

  function handleEdit(
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement, Element>,
  ) {
    event.preventDefault();
    if (!currentTitle.trim()) {
      handleDelete(todo.id);

      return;
    }

    if (currentTitle !== todo.title) {
      updateTodo({
        ...todo,
        title: currentTitle.trim(),
        isLoading: false,
      })
        .then(() => setIsEditing(false))
        .catch(() => {});
    } else {
      setIsEditing(false);
    }
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            updateTodo({
              ...todo,
              completed: !todo.completed,
              isLoading: false,
            });
          }}
        />
      </label>

      {!isEditing && (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setIsEditing(true);
            setCurrentTitle(todo.title);
          }}
        >
          {todo.title}
        </span>
      )}

      {isEditing && (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={currentTitle}
            onChange={e => setCurrentTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleEdit(e);
              }

              if (e.key === 'Escape') {
                setIsEditing(false);
              }
            }}
            autoFocus
          />
        </form>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleDelete(todo.id)}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': todo.isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
