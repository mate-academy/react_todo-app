import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  toggleCompleted: (id: number) => void,
  removeTodo: (id: number) => void,
  renameTodo: (id: number, title: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleCompleted,
  removeTodo,
  renameTodo,
}) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const selectFieldRef = useRef<HTMLInputElement>(null);

  const handleCheckboxClick = () => {
    toggleCompleted(id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleEditing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleChange = () => {
    if (newTitle.length || newTitle.trim()) {
      removeTodo(id);
      setIsEditing(false);

      return;
    }

    renameTodo(id, newTitle);
    setIsEditing(false);
  };

  const handleSavingTitle = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleTitleChange();

      return;
    }

    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (selectFieldRef.current) {
      selectFieldRef.current.focus();
    }
  });

  return (
    <li
      className={classNames(
        { completed },
        { editing: isEditing },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleCheckboxClick}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {newTitle}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="button"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        ref={selectFieldRef}
        onChange={handleTitleEditing}
        onKeyDown={handleSavingTitle}
        onBlur={handleTitleChange}
      />
    </li>
  );
};
