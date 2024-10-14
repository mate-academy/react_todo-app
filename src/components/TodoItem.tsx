/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useRef, useState } from 'react';
import { useGlobalDispatch } from '../store/Store';
import { Todo } from '../types/Todo';
import { ActionType } from '../enums/ActionTypes';
import classNames from 'classnames';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { id, title, completed } = todo;
  const dispatch = useGlobalDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const editFieldRef = useRef<HTMLInputElement>(null);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editTitle.trim()) {
      dispatch({
        type: ActionType.EDIT_TODO,
        payload: { id: todo.id, title: editTitle.trim() },
      });
    } else {
      dispatch({ type: ActionType.DELETE_TODO, payload: todo.id });
    }

    setEditTitle(editTitle.trim());
    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(todo.title);
    }
  };

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() =>
            dispatch({ type: ActionType.TOGGLE_TODO, payload: id })
          }
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleEdit}>
          <input
            ref={editFieldRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
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
            onClick={() =>
              dispatch({ type: ActionType.DELETE_TODO, payload: id })
            }
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
