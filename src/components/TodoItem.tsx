/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from '../context/TodosContext';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { id, title, completed } = todo;
  const [edited, setEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, [edited]);

  const { changeTodos } = useContext(TodosContext);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTitle.trim().length === 0) {
      changeTodos(
        {
          title: newTitle,
          completed,
          id,
        },
        'delete',
      );
    }

    changeTodos(
      {
        title: newTitle.trim(),
        completed,
        id,
      },
      'update',
    );

    setEdited(false);
  };

  const changeCompleted = () => {
    const newCompl = !completed;

    changeTodos(
      {
        title: newTitle.trim(),
        completed: newCompl,
        id,
      },
      'update',
    );
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setEdited(false);

      changeTodos(
        {
          title: title,
          completed,
          id,
        },
        'update',
      );
    }

    if (e.key === 'Enter') {
      if (title.trim().length === 0) {
        changeTodos(
          {
            title,
            completed,
            id,
          },
          'delete',
        );
      }

      changeTodos(
        {
          title: newTitle.trim(),
          completed,
          id,
        },
        'update',
      );

      setEdited(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
      onKeyUp={onKeyUp}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={changeCompleted}
        />
      </label>

      {edited ? (
        <form onSubmit={onSubmit} onBlur={onSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            ref={inputRef}
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEdited(true)}
          >
            {title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              changeTodos(todo, 'delete');
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
