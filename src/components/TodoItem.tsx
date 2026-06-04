/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useTodos } from '../contexts/TodoContext';

type Props = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { state, dispatch } = useTodos();

  const isEditing = state.editingId === todo.id;
  const inputRef = useRef<HTMLInputElement>(null);

  const saveEdit = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      dispatch({ type: 'delete', payload: todo.id });

      return;
    }

    dispatch({
      type: 'edit',
      payload: {
        id: todo.id,
        title: trimmed,
      },
    });
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
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
          onChange={() => dispatch({ type: 'toggle', payload: todo.id })}
        />
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          data-cy="TodoTitleField"
          className="todo__title-field"
          defaultValue={todo.title}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              saveEdit((e.target as HTMLInputElement).value);
            }

            if (e.key === 'Escape') {
              dispatch({ type: 'cancelEdit' });
            }
          }}
          onBlur={e => {
            saveEdit(e.target.value);
          }}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() =>
            dispatch({ type: 'startEdit', payload: todo.id })
          }
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => dispatch({ type: 'delete', payload: todo.id })}
        >
          ×
        </button>
      )}
    </div>
  );
};
