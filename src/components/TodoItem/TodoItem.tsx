import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (newTitle: string, id: number) => void;
};

export const TodoItem = React.memo<Props>(({
  todo,
  removeTodo,
  toggleTodo,
  updateTodo,
}) => {
  const { title, completed, id } = todo;
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const todoToUpdate = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoToUpdate.current) {
      todoToUpdate.current.focus();
    }
  }, [isUpdated]);

  const handleClick = () => {
    removeTodo(id);
  };

  const handleChangeCompleted = () => {
    toggleTodo(id);
  };

  const handleDoubleClick = () => {
    setIsUpdated(true);
  };

  const handleChangeTitle = (value: string) => {
    setNewTitle(value);
  };

  const handleBlur = () => {
    if (newTitle === title) {
      setIsUpdated(false);

      return;
    }

    if (!newTitle) {
      removeTodo(id);
    } else {
      updateTodo(newTitle, id);
    }

    setIsUpdated(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      setIsUpdated(false);

      return;
    }

    if (event.code === 'Enter') {
      handleBlur();
    }
  };

  return (
    <li className={classNames(
      { editing: isUpdated },
      { completed },
    )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleChangeCompleted}
          checked={completed}
        />

        <label onDoubleClick={handleDoubleClick}>
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="button"
          onClick={handleClick}
        />
      </div>

      {isUpdated && (
        <input
          type="text"
          className="edit"
          value={newTitle}
          onChange={event => handleChangeTitle(event.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          ref={todoToUpdate}
          style={{ outline: 'none' }}
        />
      )}
    </li>
  );
});
