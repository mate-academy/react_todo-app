import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React, { forwardRef, useRef, useState } from 'react';
import type { FormEvent } from 'react';

type Props = {
  todo: Todo;
  toggleStatus: (value: number) => void;
  deleteTodo: (value: number) => void;
  renameTodo: (id: number, value: string) => void;
};

export const TodoItem = forwardRef<HTMLDivElement, Props>(
  ({ todo, toggleStatus, deleteTodo, renameTodo }, ref) => {
    const { id, title, completed } = todo;

    const buttonHandler = (todoId: number) => {
      deleteTodo(todoId);
    };

    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(title);
    const isSubmitting = useRef(false);
    const isCancelling = useRef(false);

    const submitChanges = () => {
      if (isSubmitting.current) {
        return;
      }

      const normalizedValue = value.trim();

      if (normalizedValue === title) {
        setEditMode(false);

        return;
      }

      isSubmitting.current = true;

      renameTodo(id, normalizedValue);

      isSubmitting.current = false;
    };

    const formHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitChanges();
    };

    const blurHandler = () => {
      if (isCancelling.current) {
        isCancelling.current = false;

        return;
      }

      submitChanges();
    };

    const keyUphandler = (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        isCancelling.current = true;
        isSubmitting.current = false;
        setEditMode(false);
      }
    };

    const doubleClickHandler = () => {
      isCancelling.current = false;
      isSubmitting.current = false;
      setValue(title);
      setEditMode(true);
    };

    return (
      <div
        ref={ref}
        data-cy="Todo"
        className={classNames({
          todo: true,
          completed: completed,
        })}
        data-id={id}
      >
        <label
          className="todo__status-label"
          htmlFor={`input-${id}`}
          aria-label="Toggle todo status"
        >
          <input
            id={`input-${id}`}
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={() => {
              toggleStatus(id);
            }}
          />
        </label>

        {editMode ? (
          <form onSubmit={formHandler}>
            <input
              type="text"
              data-cy="TodoTitleField"
              value={value}
              placeholder="Empty todo will be deleted"
              className={classNames({
                'todo__title-field': true,
              })}
              autoFocus
              onBlur={blurHandler}
              onChange={event => {
                setValue(event.target.value);
              }}
              onKeyUp={keyUphandler}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={doubleClickHandler}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => {
                buttonHandler(id);
              }}
            >
              ×
            </button>
          </>
        )}
      </div>
    );
  },
);

TodoItem.displayName = 'TodoItem';
