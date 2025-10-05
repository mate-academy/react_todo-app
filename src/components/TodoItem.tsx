/* eslint-disable jsx-a11y/label-has-associated-control */

import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { DispatchContext } from './Store';

type Props = {
  todo: Todo;
};

type TitleEditEvent =
  | React.FormEvent<HTMLFormElement>
  | React.FocusEvent<HTMLInputElement>;

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const [editTodoId, setEditTodoId] = useState<number | null>();
  const [editTitle, setEditTitle] = useState(todo.title);

  const update = (changes: Partial<Omit<Todo, 'id'>>) => {
    dispatch({ type: 'update', payload: { id: todo.id, changes } });
  };

  const remove = () => {
    dispatch({ type: 'remove', payload: todo.id });
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setEditTodoId(null);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  function handleTitleEdit(event: TitleEditEvent) {
    event.preventDefault();
    const trimmed = editTitle.trim();

    if (trimmed === todo.title) {
      setEditTodoId(null);

      return;
    }

    if (trimmed === '') {
      remove();
      setEditTodoId(null);

      return;
    }

    update({ title: trimmed });
    setEditTodoId(null);

    return;
  }

  const handleCheckedClick = () => {
    if (todo.completed) {
      update({ completed: false });
    } else if (!todo.completed) {
      update({ completed: true });
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { 'todo completed': todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          autoFocus
          onClick={handleCheckedClick}
        />
      </label>

      {todo.id === editTodoId ? (
        <form onSubmit={e => handleTitleEdit(e)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={e => handleTitleEdit(e)}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditTodoId(todo.id)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => remove()}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
