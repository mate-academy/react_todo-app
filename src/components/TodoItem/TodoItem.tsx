import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { onUpdateTodo, onDeleteTodo, onToggleTodo } = useContext(TodoContext);
  const [title, setTitle] = useState<string>(todo.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isEscaping = useRef(false);
  const isSubmitting = useRef(false);

  const saveChanges = () => {
    if (isEscaping.current) {
      isEscaping.current = false;
      setIsEditing(false);

      return;
    }

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      onDeleteTodo(todo.id);

      return;
    }

    if (normalizedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    onUpdateTodo(todo.id, normalizedTitle);
    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      isEscaping.current = true;
      setTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label" aria-label="Toggle todo status">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            isSubmitting.current = true;
            saveChanges();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={title}
            onChange={event => setTitle(event.target.value)}
            onBlur={() => {
              if (isSubmitting.current) {
                isSubmitting.current = false;

                return;
              }

              saveChanges();
            }}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              isEscaping.current = false;
              isSubmitting.current = false;
              setIsEditing(true);
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDeleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
