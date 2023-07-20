import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  handleToggleCompleted: (todoId: number, completed: boolean) => void;
  handleRemoveTodo: (todoId: number) => void;
  handleChangeTitle: (todoId: number, newTitle: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleToggleCompleted,
  handleRemoveTodo,
  handleChangeTitle,
}) => {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!newTitle.trim()) {
      handleRemoveTodo(id);

      return;
    }

    if (newTitle !== title) {
      handleChangeTitle(id, newTitle);
    }

    setIsEditing(false);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleCancelEdit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <li className={cn({ completed: todo.completed, editing: isEditing })}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="edit"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleSubmit}
            ref={inputRef}
            onKeyUp={handleCancelEdit}
          />
        </form>
      ) : (
        newTitle.length !== 0 && (
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              style={{ cursor: 'pointer' }}
              onChange={() => handleToggleCompleted(id, completed)}
              checked={completed}
            />
            <label onDoubleClick={() => setIsEditing(true)}>{title}</label>
            {/* eslint-disable-next-line */}
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => handleRemoveTodo(id)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )
      )}
    </li>
  );
};
