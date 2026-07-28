/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Context, Todo } from '../Context';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, toggleTodo, updateTodo, focusInput } =
    useContext(Context);

  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');

  const isEscaped = React.useRef(false);

  const handleSave = () => {
    if (isEscaped.current) {
      isEscaped.current = false;

      return;
    }

    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      deleteTodo(todo.id);
      focusInput();
    } else if (trimmedTitle !== todo.title) {
      updateTodo(todo.id, trimmedTitle);
    }

    setIsEditing(false);
    focusInput();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      isEscaped.current = true;
      setEditingTitle(todo.title);
      setIsEditing(false);
      focusInput();
    }
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditingTitle(todo.title);
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            toggleTodo(todo.id);
            focusInput();
          }}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleSave();
          }}
        >
          <input
            data-cy="TodoTitleField"
            className="todo__title-field"
            type="text"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={event => setEditingTitle(event.target.value)}
            onBlur={handleSave}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={startEditing}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              deleteTodo(todo.id);
              focusInput();
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
