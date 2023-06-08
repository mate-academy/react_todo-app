/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onUpdateTodo: (id: number, parameter: Partial<Todo>) => void;
  onDeleteTodo: (id: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const [isInEditMode, setIsInEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInEditMode]);

  const handleTitleChange = () => {
    if (!newTitle.trim()) {
      onDeleteTodo(id);
      setIsInEditMode(false);

      return;
    }

    if (newTitle.trim() === title) {
      setIsInEditMode(false);

      return;
    }

    onUpdateTodo(id, { title: newTitle });
    setIsInEditMode(false);
  };

  const handleTitleReset = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsInEditMode(false);
    }
  };

  return (
    <li
      key={id}
      className={classNames(
        { completed },
        { editing: isInEditMode },
      )}
      onDoubleClick={() => {
        setIsInEditMode(true);
      }}
    >
      {isInEditMode ? (
        <form onSubmit={handleTitleChange}>
          <input
            type="text"
            className="edit"
            value={newTitle}
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
            onBlur={handleTitleChange}
            onKeyDown={handleTitleReset}
            ref={inputRef}
          />
        </form>
      ) : (
        <div
          className="view"
        >
          <input
            type="checkbox"
            className="toggle"
            onChange={() => {
              onUpdateTodo(id, { completed: !completed });
            }}
            checked={completed}
          />
          <label>{title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => {
              onDeleteTodo(id);
            }}
          />
        </div>
      )}
    </li>
  );
};
