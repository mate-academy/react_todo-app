import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { ITodo } from '../../types';

type Props = {
  todo: ITodo;
  editTodo: (id: number, newTitle: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodoStatus: (id: number) => void;
};

export const Todo: React.FC<Props> = (
  {
    todo: { id, title, completed },
    editTodo,
    deleteTodo,
    toggleTodoStatus,
  },
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && input.current) {
      input.current.focus();
    }
  }, [isEditing]);

  const onDoubleClick = () => {
    setIsEditing(true);
    input.current?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(title);
    }
  };

  const onBlur = () => {
    setIsEditing(false);

    if (title === newTitle) {
      return;
    }

    if (!newTitle.trim()) {
      deleteTodo?.(id);

      return;
    }

    editTodo(id, newTitle);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsEditing(false);
    editTodo(id, newTitle);
  };

  return (
    <li className={
      classNames({
        editing: isEditing,
        completed,
      })
    }
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => toggleTodoStatus(id)}

        />

        <label
          onDoubleClick={onDoubleClick}
        >
          {title}
        </label>

        <button
          type="button"
          aria-label="Delete"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>

      <form onSubmit={onSubmit}>
        <input
          ref={input}
          type="text"
          className="edit"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      </form>
    </li>
  );
};
