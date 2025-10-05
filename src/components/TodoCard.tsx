import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { TodoContext } from '../context/TodoContext';
import { type Todo } from '../types/types';

type Props = {
  todo: Todo;
};

export const TodoCard: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useContext(TodoContext);
  const [title, setTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);

  const fieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setTitle(todo.title);
      fieldRef.current?.focus();
    }
  }, [editing, todo.title]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();

    if (trimmed) {
      updateTodo(todo.id, trimmed);
    } else {
      deleteTodo(todo.id);
    }

    setEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditing(false);
    }
  };

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
          onChange={() => toggleTodo(todo.id)}
          aria-label="Toggle todo status"
        />
      </label>

      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            ref={fieldRef}
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={handleSubmit}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditing(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
            aria-label="Delete todo"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
