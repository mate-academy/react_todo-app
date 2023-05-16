import React, { FormEvent, FocusEvent } from 'react';
import classnames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo
  selectedId: number | null
  editedTodoId: number | null
  newTitle: string
  onChangeTodoTitle: (
    event: FormEvent<HTMLFormElement> | FocusEvent<HTMLInputElement>
  ) => void
  onAddNewTitle: (value: string) => void
  onEditedTodoId: (value: number | null) => void
  onDelete: (todoId: number) => void
  onToggle: (todoId: number, check: boolean) => void
}

export const TodoItem: React.FC<Props> = ({
  todo,
  newTitle,
  selectedId,
  editedTodoId,
  onToggle,
  onEditedTodoId,
  onAddNewTitle,
  onChangeTodoTitle,
  onDelete,
}) => {
  const { completed, title, id } = todo;

  return (

    <div
      className={classnames(
        'todo',
        { completed },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => onToggle(id, completed)}
        />
      </label>

      {editedTodoId === id
        ? (
          <form
            onSubmit={(event) => onChangeTodoTitle(event)}
          >
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={newTitle}
              onKeyUp={(event) => {
                if (event.key === 'Escape') {
                  onEditedTodoId(null);
                }
              }}
              onChange={(event) => onAddNewTitle(event.target.value)}
              onBlur={(event) => onChangeTodoTitle(event)}
            />
          </form>
        ) : (
          <>
            <span
              className="todo__title"
              onDoubleClick={() => {
                onEditedTodoId(id);
                onAddNewTitle(title);
              }}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              onClick={() => onDelete(id)}
            >
              ×
            </button>
          </>
        )}

      <div className={`modal overlay ${id === 0 || selectedId === id
        ? 'is-active'
        : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
