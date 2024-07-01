import classNames from 'classnames';
import { Todo } from '../types/Todo';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dispatch } from './ToDoContext';

type Props = {
  todo: Todo;
  key: number;
};

export const ToDoItem: React.FC<Props> = ({ todo }) => {
  const [editted, setEditted] = useState(false);
  const [edittedTitle, setEdittedTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useContext(Dispatch);

  const handleSubmit = () => {
    const trimmedTitle = edittedTitle.trim();

    if (todo.title === trimmedTitle) {
      setEdittedTitle(todo.title);
    }

    if (!trimmedTitle) {
      dispatch({
        type: 'DELETE TODO',
        idNumber: todo.id,
      });
    }

    dispatch({
      type: 'UPDATE TITLE',
      idNumber: todo.id,
      edittedTitle: edittedTitle.trim(),
    });

    setEditted(false);
  };

  useEffect(() => {
    if (inputRef.current && editted) {
      inputRef.current.focus();
    }
  }, [editted]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      {editted ? (
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            disabled={todo.editted}
            onClick={() => {
              dispatch({
                type: 'CHANGE TODO STATUS',
                idNumber: todo.id,
              });
            }}
          />
        </label>
      ) : (
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onClick={() => {
              dispatch({
                type: 'CHANGE TODO STATUS',
                idNumber: todo.id,
              });
            }}
          />
        </label>
      )}

      {editted ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={inputRef}
            value={edittedTitle}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEdittedTitle(event.target.value);
            }}
            onBlur={handleSubmit}
            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Escape') {
                setEditted(false);
                setEdittedTitle(todo.title);
              }
            }}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setEditted(true);
              setEdittedTitle(todo.title);
            }}
            autoFocus
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              dispatch({
                type: 'DELETE TODO',
                idNumber: todo.id,
              });
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
