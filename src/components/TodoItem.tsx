/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import {
  deleteTodo, editTodoTitle, getTodos, toggleTodoStatus,
} from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  setTodos: (value: Todo[]) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, setTodos }) => {
  const [editStatus, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    setNewTitle(todo.title);
  }, []);

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    getTodos().then(setTodos);
  };

  const handleClick = async () => {
    await toggleTodoStatus(todo.id, !todo.completed);
    getTodos().then(setTodos);
  };

  const uploadTitle = () => {
    if (!newTitle.length) {
      handleDelete();
    }

    setEdit(false);
    editTodoTitle(todo.id, newTitle);
    getTodos().then(setTodos);
  };

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && newTitle === todo.title) {
      setEdit(false);
    }

    if (event.key === 'Enter') {
      uploadTitle();
    }

    if (event.key === 'Escape') {
      setEdit(false);
      setNewTitle(todo.title);
    }
  };

  const handleBlur = () => {
    setEdit(false);

    if (todo.title !== newTitle) {
      uploadTitle();
    }
  };

  return (
    <>
      <li
        className={classNames({
          completed: todo.completed,
          editing: editStatus,
        })}
      >
        {editStatus
          ? (
            <input
              type="text"
              className="edit"
              value={newTitle}
              autoFocus
              onBlur={handleBlur}
              onKeyDown={handleEnter}
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
            />
          ) : (
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                checked={todo.completed}
                id={`${todo.id}`}
                onChange={handleClick}

              />
              <label
                role="presentation"
                onClick={() => {
                  setEdit(true);
                }}
              >
                {newTitle}
              </label>
              <button
                type="button"
                className="destroy"
                data-cy="deleteTodo"
                onClick={handleDelete}
              />
            </div>
          )}
      </li>

    </>
  );
};
