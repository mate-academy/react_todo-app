/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { useAppDispatch } from '../hooks/hooks';
import { remove, toggle, update } from '../features/todosSlice';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const editInputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputField.current) {
      editInputField.current.focus();
    }
  }, [isEditing, editInputField]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(todo.title);
    }
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (editTitle.trim() === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!editTitle.trim()) {
      dispatch(remove(todo));
    }

    dispatch(update({ id: todo.id, newTitle: editTitle }));
    setIsEditing(false);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={() => dispatch(toggle(todo))}
          checked={todo.completed}
          onChange={() => {}}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={event => setEditTitle(event.target.value)}
            onBlur={handleEditSubmit}
            onKeyUp={handleKeyUp}
            ref={editInputField}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch(remove(todo))}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
