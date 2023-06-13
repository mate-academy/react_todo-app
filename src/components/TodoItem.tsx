/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  deleteTodo: (todoId: number) => void,
  toggleCompleteTodos: (todoId: number, completed: boolean) => void,
  changeTodoTitle: (todoId: number, newTitle: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  deleteTodo,
  toggleCompleteTodos,
  todo,
  changeTodoTitle,
}) => {
  const { id, title, completed } = todo;
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleDeleTodo = () => {
    deleteTodo(id);
  };

  const handleCompleteTodo = () => {
    toggleCompleteTodos(id, completed);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleOnBlur = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTitle !== title) {
      changeTodoTitle(id, newTitle);
      setIsEditing(false);
    }

    if (!newTitle.trim().length) {
      deleteTodo(id);
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        changeTodoTitle(id, newTitle);
        setIsEditing(false);
        break;

      case 'Escape':
        setNewTitle(title);
        setIsEditing(false);
        break;

      default: break;
    }
  };

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
      key={id}
    >
      <div className="view">
        <input
          checked={completed}
          onChange={handleCompleteTodo}
          type="checkbox"
          className="toggle"
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>

        <button
          onClick={handleDeleTodo}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>

      <form
        onSubmit={handleOnBlur}
      >
        <input
          ref={inputRef}
          value={newTitle}
          type="text"
          className="edit"
          onKeyUp={handleKeyUp}
          onBlur={handleOnBlur}
          onChange={handleInputChange}
        />
      </form>

    </li>
  );
};
