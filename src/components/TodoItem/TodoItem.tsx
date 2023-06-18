import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onUpdateTodo: (id: number, parameter: Partial<Todo>) => void,
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
  const [expired, setExpired] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInEditMode]);

  const handleEditMode = () => {
    setIsInEditMode(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleUpdate = () => {
    if (!newTitle.trim()) {
      onDeleteTodo(id);
      setIsInEditMode(false);

      return;
    }

    if (newTitle.trim() === title) {
      setNewTitle(title.trim());
      setIsInEditMode(false);

      return;
    }

    onUpdateTodo(id, { title: newTitle.trim() });
    setIsInEditMode(false);
  };

  const handleTitleReset = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsInEditMode(false);
    }
  };

  const handleDoubleTouch = (event: React.TouchEvent) => {
    if (event.touches.length === 1) {
      if (!expired) {
        setExpired(event.timeStamp + 400);
      } else if (event.timeStamp <= expired) {
        setIsInEditMode(true);
        setExpired(null);
      } else {
        setExpired(event.timeStamp + 400);
      }
    }
  };

  const handleStatusChange = () => {
    onUpdateTodo(id, { completed: !completed });
  };

  const handleTodoRemove = () => {
    onDeleteTodo(id);
  };

  return (
    <li
      className={classNames(
        'todolist__item',
        { 'todolist__item--completed': completed },
        { 'todolist__item--editing': isInEditMode },
      )}
      onDoubleClick={handleEditMode}
      onTouchStart={handleDoubleTouch}
    >
      {isInEditMode ? (
        <form
          onSubmit={handleTitleUpdate}
        >
          <input
            type="text"
            name="editTodoTitle"
            className="todolist__edit-field"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleUpdate}
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
            onChange={handleStatusChange}
            checked={completed}
          />
          <label>{title}</label>
          <button
            type="button"
            className="todolist__destroy-item"
            aria-label="Delete todo item"
            data-cy="deleteTodo"
            onClick={handleTodoRemove}
          />
        </div>
      )}
    </li>
  );
};
