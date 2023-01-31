import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  onDeleteTodo(id: number): void,
  onToggle(id: number): void,
  onRenameTodo(id: number, str: string): void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDeleteTodo,
  onToggle,
  onRenameTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const onChangeTitle = (str: string) => {
    setNewTitle(str);
  };

  const onSubmitNewTitle = (str: string) => {
    setIsEditing(false);

    const title = str.trim();

    if (title) {
      if (todo.title !== title) {
        onRenameTodo(todo.id, title);
      }
    } else {
      onDeleteTodo(todo.id);
    }
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(todo.title);
    }

    if (ev.key === 'Enter') {
      onSubmitNewTitle(newTitle);
    }
  };

  return (
    <li
      onDoubleClick={() => setIsEditing(!isEditing)}
      className={classNames(
        { completed: todo.completed },
        { editing: isEditing },
      )}
    >
      <div
        className="view"
      >
        <input
          type="checkbox"
          className="toggle"
          id={classNames(
            { 'toggle-view': !todo.completed },
            { 'toggle-completed': todo.completed },
          )}
          onClick={() => onToggle(todo.id)}
          checked={todo.completed}
          onChange={() => {}}
        />
        <label>{todo.title}</label>
        {/* eslint-disable-next-line */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDeleteTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={(ev) => onChangeTitle(ev.target.value)}
        onKeyDown={(ev) => onKeyDown(ev)}
        onBlur={() => onSubmitNewTitle(newTitle)}
      />
    </li>
  );
};
