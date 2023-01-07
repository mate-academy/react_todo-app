import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (newTitle: string, id: number) => void;
  updatedTodoId: number | null;
  setUpdatedTodoId: (id: number | null) => void;
};

export const TodoItem = React.memo<Props>(({
  todo,
  removeTodo,
  toggleTodo,
  updateTodo,
  updatedTodoId,
  setUpdatedTodoId,
}) => {
  const { title, completed, id } = todo;
  const [newTitle, setNewTitle] = useState<string>(title);
  const todoToUpdate = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoToUpdate.current) {
      todoToUpdate.current.focus();
    }
  }, [updatedTodoId]);

  const handleClick = () => {
    removeTodo(id);
  };

  const handleChangeCompleted = () => {
    toggleTodo(id);
  };

  const handleDoubleClick = () => {
    setUpdatedTodoId(id);
  };

  const handleChangeTitle = (value: string) => {
    setNewTitle(value);
  };

  const handleBlur = () => {
    if (newTitle === title) {
      setUpdatedTodoId(null);

      return;
    }

    if (!newTitle) {
      removeTodo(id);
      setUpdatedTodoId(null);

      return;
    }

    updateTodo(newTitle, id);
    setUpdatedTodoId(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      setUpdatedTodoId(null);

      return;
    }

    if (event.code === 'Enter') {
      handleBlur();
    }
  };


  return (
    <>
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

      {updatedTodoId === id && (
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
    </>
  );
});
