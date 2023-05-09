import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  toggleCompleted: (id: number) => void,
  removeTodo: (id:number) => void,
  renameTodo: (id: number, title: string) => void,
};

export const TodoItem:React.FC<Props> = ({
  todo,
  toggleCompleted,
  removeTodo,
  renameTodo,
}) => {
  const { id, title, completed } = todo;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleToggleCompleted = () => {
    toggleCompleted(id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleChangeOnBlur = () => {
    if (!newTitle.length || !newTitle.trim()) {
      removeTodo(id);
      setIsEditing(false);

      return;
    }

    renameTodo(id, newTitle);
    setIsEditing(false);
  };

  const handleSavingTitle = (event:React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleTitleChangeOnBlur();

      return;
    }

    if (event.key === 'Escape') {
      setNewTitle(title);
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
          onChange={handleToggleCompleted}
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
      {!!isEditing && (
        <input
          type="text"
          className="edit"
          value={newTitle}
          ref={inputRef}
          onChange={handleNewTitle}
          onKeyDown={handleSavingTitle}
          onBlur={handleTitleChangeOnBlur}
        />
      )}
    </li>
  );
};
