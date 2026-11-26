/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todos';
import { useTodosContext } from '../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);

  const { deleteTodo, newTitle, setNewTitle, editTodo, toggleTodo } =
    useTodosContext();

  const renameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    renameInput.current?.focus();
  }, [isEditing]);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => toggleTodo(id)}
        />
      </label>
      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            editTodo(todo.id);
            setIsEditing(false);
            setNewTitle('');
          }}
        >
          <input
            ref={renameInput}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            onBlur={() => {
              editTodo(id);
              setIsEditing(false);
              setNewTitle('');
            }}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                setIsEditing(false);
                setNewTitle(title);
              }
            }}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEditing(!isEditing);
              setNewTitle(title);
            }}
          >
            {title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
