import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onRemove: () => void;
  onChange: (newValues: {
    [key in keyof Todo]?: boolean | string | number;
  }) => void;
};

export const TodoInfo: React.FC<Props> = ({ todo, onRemove, onChange }) => {
  const [title, setTitle] = useState(todo.title);

  const saveTitle = (newTitle: string) => {
    if (title.trim() === '') {
      onRemove();

      return;
    }

    onChange({ title: newTitle.trim(), beingEdited: false });
  };

  const handleTitleSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const handleCheckbox = () => onChange({ completed: !todo.completed });

  const handleDoubleClick = () => onChange({ beingEdited: true });

  const handleTitleBlur = () => {
    saveTitle(title);
  };

  const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onChange({ beingEdited: false });
      setTitle(todo.title);
    } else if (event.key === 'Enter') {
      saveTitle(title);
    }
  };

  useEffect(() => {
    if (todo.beingEdited) {
      document.addEventListener('keyup', handleKeyup);

      return () => {
        document.removeEventListener('keyup', handleKeyup);
      };
    }

    return;
  });

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      onDoubleClick={handleDoubleClick}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
          onChange={handleCheckbox}
        />
      </label>
      {todo.beingEdited ? (
        <form onSubmit={handleTitleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={title}
            onBlur={handleTitleBlur}
            onChange={handleTitleChange}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={onRemove}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
