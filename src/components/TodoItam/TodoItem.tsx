import React, { useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo,
  onDelete: (id: number) => void,
  onUpdateTodoTitle: (id: number, newTitle: string) => void;
  onToggleTodo: (todoId: number) => void,
  isDisabled: boolean,
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onUpdateTodoTitle,
  onToggleTodo,
  isDisabled,
}) => {
  const [query, setQuery] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSaveChanges = () => {
    const newTitle = query.trim();

    if (newTitle === '') {
      onDelete(todo.id);
    } else if (newTitle !== todo.title) {
      onUpdateTodoTitle(todo.id, newTitle);
    }

    setIsEditing(false);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setQuery(todo.title);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      handleCancelEditing();
    }

    if (event.key === 'Enter') {
      handleCancelEditing();
    }
  };

  return (
    <li className={cn({
      completed: todo.completed,
      editing: isEditing,
    })}
    >
      {isDisabled ? (
        <Loader />
      ) : (
        <>
          <div
            className="view"
          >
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => onToggleTodo(todo.id)}
            />
            <label
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="deleteTodo"
              onClick={() => {
                onDelete(todo.id);
              }}
            />
          </div>
          <input
            type="text"
            className="edit"
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onBlur={handleSaveChanges}
            onKeyUp={handleKeyDown}
          />
        </>
      )}
    </li>
  );
};
