/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  onTodoDelete: (todoId: number) => void;
  onTodoUpdate: (todo: Todo) => void;
};

export const TodoItem = React.memo(
  ({ todo, onTodoDelete, onTodoUpdate }: Props) => {
    const isCompleted = todo.completed;
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);

    useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus();
      }
    }, [isEditing]);

    const handleCompletedUpdate = async (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      onTodoUpdate({
        ...todo,
        completed: event.target.checked,
      });
    };

    const handleEditingStart = () => {
      setIsEditing(true);
    };

    const handleTitleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        setTitle(todo.title);
        setIsEditing(false);
      }
    };

    type UpdateEventType =
      | React.FormEvent<HTMLFormElement>
      | React.FocusEvent<HTMLInputElement>;

    const handleTitleUpdate = (event: UpdateEventType) => {
      event.preventDefault();

      const newTitle = title.trim();

      if (newTitle === todo.title) {
        setIsEditing(false);

        return;
      }

      if (newTitle.length === 0) {
        onTodoDelete(todo.id);

        return;
      }

      onTodoUpdate({
        ...todo,
        title: newTitle,
      });

      setTitle(newTitle);
      setIsEditing(false);
    };

    return (
      <div
        data-cy="Todo"
        className={classNames('todo', { completed: isCompleted })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={isCompleted}
            onChange={handleCompletedUpdate}
          />
        </label>

        {isEditing ? (
          <form onSubmit={handleTitleUpdate}>
            <input
              ref={inputRef}
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={title}
              onChange={event => setTitle(event.target.value)}
              onKeyUp={handleTitleKeyUp}
              onBlur={handleTitleUpdate}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={handleEditingStart}
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => onTodoDelete(todo.id)}
            >
              ×
            </button>
          </>
        )}
      </div>
    );
  },
);

TodoItem.displayName = 'TodoItem';
