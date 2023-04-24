/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  removeTodo: (id:number) => void;
  handleUpdate: (id: number, data: boolean | string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  removeTodo,
  handleUpdate,
}) => {
  const { id, title, completed } = todo;
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const todoTitleInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todoTitleInput.current) {
      todoTitleInput.current.focus();
    }
  }, [isTodoEditing]);

  const changeTitle = (str: string) => {
    if (str) {
      handleUpdate(id, str);
    } else {
      removeTodo(id);
    }

    setIsTodoEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      changeTitle(newTitle);
    }

    if (e.code === 'Escape') {
      setNewTitle(title);
      setIsTodoEditing(false);
    }
  };

  return (
    <li className={classNames({ editing: isTodoEditing }, { completed })}>
      <div className="view" onDoubleClick={() => setIsTodoEditing(true)}>
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => handleUpdate(id, !completed)}
        />
        <label>{newTitle}</label>
        <button
          onClick={() => removeTodo(id)}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        ref={todoTitleInput}
        type="text"
        className="edit"
        value={newTitle}
        onBlur={() => changeTitle(newTitle)}
        onKeyUp={handleKeyUp}
        onChange={e => setNewTitle(e.target.value)}
      />
    </li>
  );
};
