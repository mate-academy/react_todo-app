/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';

interface Props {
  id: number;
  title: string;
  editableTitle: string;
  isTodoChecked: boolean;
  editableTodoById: number;
  todoInputRef: React.MutableRefObject<HTMLInputElement | null>;
  setEditableTitle: (value: string) => void;
  editHandler: (id: number, title: string) => void;
  deleteHandler: (ids: number[]) => void;
  toogleHandler: (id: number) => void;
  onSubmit: (event: React.FormEvent, id: number) => void;
}

export const TodoItem: React.FC<Props> = React.memo(
  ({
    id,
    title,
    editableTitle,
    editableTodoById,
    isTodoChecked,
    todoInputRef,
    setEditableTitle,
    editHandler,
    deleteHandler,
    toogleHandler,
    onSubmit,
  }) => {
    return (
      <div
        data-cy="Todo"
        className={classNames('todo', { completed: isTodoChecked })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            onChange={() => toogleHandler(id)}
            checked={isTodoChecked}
          />
        </label>

        {editableTodoById === id ? (
          <form onSubmit={event => onSubmit(event, id)}>
            <input
              ref={todoInputRef}
              onBlur={event => onSubmit(event, id)}
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editableTitle}
              onChange={event => setEditableTitle(event.target.value)}
            />
          </form>
        ) : (
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => editHandler(id, title)}
          >
            {title || 'Todo is being saved now'}
          </span>
        )}

        {editableTodoById !== id && (
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteHandler([id])}
          >
            ×
          </button>
        )}
      </div>
    );
  },
);

TodoItem.displayName = 'TodoItem';
