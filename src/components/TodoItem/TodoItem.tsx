import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onRenameTodo: (todoId: string, updatedTitle: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onToggleTodo,
  onDeleteTodo,
  onRenameTodo,
}) => {
  const { id, title, completed } = todo;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!editedTitle) {
      onDeleteTodo(id);

      return;
    }

    if (editedTitle !== title) {
      onRenameTodo(todo.id, editedTitle);
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { editing: isEditing },
      )}
      onDoubleClick={() => {
        setIsEditing(!isEditing);
      }}
    >
      { !isEditing
        ? (
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={completed}
              onChange={() => onToggleTodo(id)}
            />

            <label>{title}</label>

            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="deleteTodo"
              onClick={() => onDeleteTodo(id)}
            />
          </div>
        ) : (
          <input
            type="text"
            className="edit"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            ref={inputRef}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            onBlur={handleSubmit}
          />
        )}
    </li>
  );
};
