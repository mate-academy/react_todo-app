/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Todo, TodoActionType } from '../types/Todo';

type Props = {
  todo: Todo
  changeTodo: (id: number, action: TodoActionType, newTitle?: string) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, changeTodo }) => {
  const [onEdit, setEdit] = useState(false);
  const [newTitle, setTitle] = useState(todo.title);
  const editField = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onEdit && editField.current !== null) {
      editField.current.focus();
    }
  });

  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case ('Enter'):
        if (newTitle !== '') {
          changeTodo(todo.id, TodoActionType.edit, newTitle);
        } else {
          setTitle(todo.title);
        }

        setEdit(false);
        break;
      case ('Escape'):
        setEdit(false);
        setTitle(todo.title);
        break;
      default:
        break;
    }
  };

  return (
    <li
      className={classNames({ completed: todo.completed, editing: onEdit })}
      key={+new Date()}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => changeTodo(todo.id, TodoActionType.changeStatus)}
        />
        <label
          onDoubleClick={() => {
            setEdit(true);
          }}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => changeTodo(todo.id, TodoActionType.delete)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editField}
        value={newTitle}
        onChange={(event) => setTitle(event.target.value.trim())}
        onBlur={() => setEdit(false)}
        onKeyUp={(event) => keyPress(event)}
      />
    </li>
  );
};
