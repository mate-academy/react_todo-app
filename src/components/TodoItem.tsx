import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  toggleCompleted: (value: number) => void;
  onRemoveTodo: (value: number) => void;
  onRename:(val1: number, val2: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo, toggleCompleted, onRemoveTodo, onRename,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const selectFieldRef = useRef<HTMLInputElement>(null);

  const handleCheckboxClick = () => {
    toggleCompleted(todo.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleEditing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleChange = () => {
    if (newTitle.length === 0 || newTitle.trim() === '') {
      onRemoveTodo(todo.id);
      setIsEditing(false);

      return;
    }

    onRename(todo.id, newTitle);
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
        { completed: todo.completed },
        { editing: isEditing },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
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
          onClick={() => onRemoveTodo(todo.id)}
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
