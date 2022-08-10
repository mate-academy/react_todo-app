/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  deleteHandler: (todoId: number) => void,
  completeHandler: (todoId: number) => void,
  editHandler: (todoId: number, newTitle: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteHandler,
  completeHandler,
  editHandler,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const setNewTodoTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      editHandler(todo.id, editedTitle);
      setEditing(false);
    }

    if (event.key === 'Escape') {
      setEditedTitle(todo.title);
      setEditing(false);
    }
  };

  return (
    <>
      <li
        className={classNames({
          completed: todo.completed,
          editing,
          'view-2': todo.title !== editedTitle,
        })}
        onDoubleClick={() => setEditing(!editing)}
      >
        <div className="view">
          {todo.completed
            ? (
              <input
                type="checkbox"
                className="toggle"
                id="toggle-view"
                onClick={() => completeHandler(todo.id)}
                checked
              />
            )
            : (
              <input
                type="checkbox"
                className="toggle"
                id="toggle-view"
                onClick={() => completeHandler(todo.id)}
              />
            )}
          <label>{todo.title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteHandler(todo.id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={editedTitle}
          onChange={event => {
            setEditedTitle(event.target.value);
          }}
          onKeyDown={setNewTodoTitle}
        />
      </li>
    </>
  );
};
