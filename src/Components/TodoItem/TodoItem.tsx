/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext } from '../../utils/GlobalContext';

type Props = {
  todo: Todo;
};
type SubmitProps =
  | React.FocusEvent<HTMLInputElement>
  | React.KeyboardEvent<HTMLInputElement>
  | React.FormEvent<HTMLFormElement>;

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const { title, completed } = todo;
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const inputElem = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputElem.current) {
      inputElem.current.focus();
    }
  }, [editing]);

  const handleCancel = () => {
    setEditing(false);
    setNewTitle(todo.title);
  };

  const handleKeyEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.type === 'keyup') {
      const keyEvent = event as React.KeyboardEvent<HTMLInputElement>;

      if (keyEvent.key === 'Escape') {
        handleCancel();
      }
    }
  };

  function handleSubmit(event: SubmitProps): void {
    event.preventDefault();
    setEditing(false);

    if (newTitle.length === 0) {
      dispatch({ type: 'deleteTodo', payload: todo.id });

      return;
    }

    if (todo.title !== newTitle) {
      dispatch({ type: 'editTodo', payload: { id: todo.id, title: newTitle } });
    }
  }

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
          defaultChecked={completed}
          onClick={() => {
            dispatch({ type: 'toggleTodo', payload: todo.id });
          }}
        />
      </label>

      {!editing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditing(true)}
          >
            {newTitle}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch({ type: 'deleteTodo', payload: todo.id })}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={e => handleSubmit(e)}>
          <input
            data-cy="TodoTitleField"
            ref={inputElem}
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={handleSubmit}
            onKeyUp={handleKeyEvent}
          />
        </form>
      )}
    </div>
  );
};
