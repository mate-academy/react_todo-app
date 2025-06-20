/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import { Todo } from '../types/Todo';
import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

type Props = {
  todo: Todo;
};

export const TodoItem = React.memo(function TodoItem({ todo }: Props) {
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const { deleteTodo, updateTodoTitle, updateTodoStatus } = useTodos();

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      deleteTodo(todo.id);

      return;
    }

    if (trimmedTitle !== todo.title) {
      updateTodoTitle(todo.id, trimmedTitle);

      e?.currentTarget?.blur();
    }

    setIsTodoEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle(todo.title);
      setIsTodoEditing(false);
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => updateTodoStatus(todo.id, !todo.completed)}
          checked={todo.completed}
        />
      </label>

      {isTodoEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyUp={handleKeyUp}
            onBlur={() => handleSubmit()}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsTodoEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {!isTodoEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
});
