/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../Types/Types';
import classNames from 'classnames';
import { TodosContext } from '../context/TodosContext';
type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useContext(TodosContext);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isEdeting, setIsEditing] = useState(false);

  function handleEditSumbit(event: React.FormEvent) {
    event.preventDefault();

    const trimmedTitle = editTitle.trim();

    if (trimmedTitle.length === 0) {
      dispatch({ type: 'delete', payload: [todo] });
    } else {
      dispatch({ type: 'edit', payload: { todo, trimmedTitle } });
    }

    setIsEditing(false);
  }

  function handleCancel(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdeting]);

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
          checked={todo.completed}
          onChange={() => dispatch({ type: 'check', payload: todo })}
        />
      </label>

      {isEdeting ? (
        <form onSubmit={handleEditSumbit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={event => setEditTitle(event.target.value)}
            onBlur={handleEditSumbit}
            onKeyUp={handleCancel}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            onDoubleClick={() => setIsEditing(true)}
            className="todo__title"
          >
            {todo.title}
          </span>

          <button
            type="button"
            onClick={() => dispatch({ type: 'delete', payload: [todo] })}
            className="todo__remove"
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
