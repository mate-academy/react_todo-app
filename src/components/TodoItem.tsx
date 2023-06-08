/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  onToggleCompleted: (id: number) => void;
  onRemoveTodo: (id: number) => void;
  onEditTodo: (id: number, newTitle: string) => void;
}
export const TodoItem: React.FC<Props> = React.memo(({
  todo,
  onToggleCompleted,
  onRemoveTodo,
  onEditTodo,
}) => {
  const { title, completed, id } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isEditing]);

  const handleEditedTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTitle) {
      onRemoveTodo(id);

      return;
    }

    onEditTodo(id, newTitle);
    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <li className={classNames({
      completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          id="toggle-completed"
          onChange={() => onToggleCompleted(id)}
        />
        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}

        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onRemoveTodo(id)}
        />
      </div>
      <form
        onSubmit={handleEditedTodoSubmit}
        onBlur={handleEditedTodoSubmit}
      >
        <input
          onKeyUp={(event) => handleKeyUp(event)}
          ref={inputRef}
          type="text"
          className="edit"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
      </form>
    </li>
  );
});
