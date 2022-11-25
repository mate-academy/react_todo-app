/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo
  changeToggleStatus: (todoId: number) => void;
  removeTodo: (todoId: number) => void
  changeTodoTitle: (newTodoTitle: string, todoId: number) => void;
};

export const TodoItem: FC<Props> = (
  {
    todo, changeToggleStatus, removeTodo, changeTodoTitle,
  },
) => {
  const { id, title, completed } = todo;
  const [newTodoTitle, setNewTodoTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const isEditingField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingField.current) {
      isEditingField.current.focus();
    }
  }, [isEditing]);

  const onChangeTitle = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodoTitle !== title) {
      changeTodoTitle(newTodoTitle, id);
      setIsEditing(false);
    }

    setIsEditing(false);
  };

  const onCancelEditing = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setNewTodoTitle(title);
    }
  };

  return (
    <li className={classNames(
      { completed },
      { editing: isEditing },
    )}
    >
      <div className="view">
        <input
          id="toggle-view"
          type="checkbox"
          className="toggle"
          onChange={() => changeToggleStatus(id)}
          checked={completed}
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
          onClick={() => removeTodo(id)}
        />
      </div>
      <form onSubmit={onChangeTitle}>
        <input
          type="text"
          className="edit"
          ref={isEditingField}
          value={newTodoTitle}
          onChange={event => setNewTodoTitle(event.target.value)}
          onBlur={onChangeTitle}
          onKeyUp={onCancelEditing}
        />
      </form>
    </li>
  );
};
