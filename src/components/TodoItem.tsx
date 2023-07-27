/* eslint-disable no-useless-return */
import classNames from 'classnames';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from '../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo;
  removeTodoFromServer: (id: number) => void,
  updateStatusTodoOnServer: (id: number, status: boolean) => void,
  updateTitleTodoOnServer: (id: number, title: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  removeTodoFromServer,
  updateStatusTodoOnServer,
  updateTitleTodoOnServer,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const saveNewTitle = (event: FormEvent) => {
    event.preventDefault();

    const normalizeTitle = newTitle.trim();

    if (normalizeTitle === title) {
      setIsEditingMode(false);

      return;
    }

    if (!normalizeTitle.length) {
      removeTodoFromServer(id);
    }

    updateTitleTodoOnServer(id, newTitle);
    setIsEditingMode(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEditingMode(false);
    }

    if (event.key === 'Enter') {
      saveNewTitle(event);
    }
  };

  return (
    <li
      className={classNames({
        editing: isEditingMode,
        completed: todo.completed,
      })}
      onDoubleClick={() => setIsEditingMode(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => (
            updateStatusTodoOnServer(id, completed))}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodoFromServer(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={handleTitle}
        onKeyUp={handleKeyUp}
        onBlur={saveNewTitle}
      />
    </li>
  );
};
