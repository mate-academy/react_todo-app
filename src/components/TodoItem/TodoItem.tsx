/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onUpdate(id: number, todo: Todo | null): void,
};

export const TodoItem: React.FC<Props> = ({ todo, onUpdate }) => {
  const [title, setTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);

  const editTodo = (count: number) => {
    if (count === 2) {
      setEditing(true);
    }
  };

  const handleOnEdit = (typeOfValue: string, value: string | boolean) => {
    let newTodo: Todo | null = { ...todo };

    switch (typeOfValue) {
      case 'title':
        if (typeof value === 'string') {
          if (value.length === 0) {
            handleOnEdit('deleted', true);
            break;
          }

          newTodo.title = value;
        }

        break;

      case 'completed':
        if (typeof value === 'boolean') {
          newTodo.completed = value;
        }

        break;

      case 'deleted':
        newTodo = null;
        break;

      default:
    }

    onUpdate(todo.id, newTodo);
  };

  return (
    <li className={classNames({
      editing,
      completed: todo.completed,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={(event) => handleOnEdit('completed', event.target.checked)}
          checked={todo.completed}
        />

        <label
          role="presentation"
          onClick={(e) => editTodo(e.detail)}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleOnEdit('deleted', true)}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={title}
        onChange={event => setTitle(event.target.value)}
        onKeyUp={event => {
          if (event.key === 'Enter') {
            handleOnEdit('title', title);
            setEditing(false);
          }

          if (event.key === 'Escape') {
            setTitle(todo.title);
            setEditing(false);
          }
        }}
        onBlur={() => {
          handleOnEdit('title', true);
          setEditing(false);
        }}
      />
    </li>
  );
};
