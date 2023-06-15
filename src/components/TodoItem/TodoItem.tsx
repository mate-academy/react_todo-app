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
    }

    if (newTitle.trim() === title) {
      setIsInEditMode(false);
    }

    onUpdateTodo(id, { title: newTitle });
    setIsInEditMode(false);
  };

  const handleTitleReset = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsInEditMode(false);
    }
  };

  let expired: number | null;

  const doubleTouch = (event: React.TouchEvent) => {
    if (event.touches.length === 1) {
      if (!expired) {
        expired = event.timeStamp + 400;
      } else if (event.timeStamp <= expired) {
        // remove the default of this event ( Zoom )
        event.preventDefault();
        setIsInEditMode(true);
        // then reset the variable for other "double Touches" event
        expired = null;
      } else {
        // if the second touch was expired, make it as it's the first
        expired = event.timeStamp + 400;
      }
    }
  };

  return (
    <li
      key={id}
      className={classNames(
        'todolist__item',
        { 'todolist__item--completed': completed },
        { 'todolist__item--editing': isInEditMode },
      )}
      onDoubleClick={() => {
        setIsInEditMode(true);
      }}
      onTouchStart={doubleTouch}
    >
      {isInEditMode ? (
        <form
          onSubmit={handleTitleChange}
        >
          <input
            type="text"
            name="editTodoTitle"
            className="todolist__edit-field"
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
          className="todolist__view-item"
        >
          <input
            type="checkbox"
            name="toggleTodoStatus"
            className="todolist__toggle-item"
            onChange={() => {
              onUpdateTodo(id, { completed: !completed });
            }}
            checked={completed}
          />
          <label>{title}</label>
          <button
            type="button"
            className="todolist__destroy-item"
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
