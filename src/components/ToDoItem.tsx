import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/ToDo';

type Props = {
  todo: Todo;
  deleteHandler: (todoId: number) => void,
  completeHandler: (todoId: number) => void,
  updateHandler: (todoId: number, newTitle: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteHandler,
  completeHandler,
  updateHandler,
}) => {
  const [updating, setUpdating] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  const setNewTodoTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateHandler(todo.id, updatedTitle);
      setUpdating(false);
    }

    if (event.key === 'Escape') {
      setUpdatedTitle(todo.title);
      setUpdating(false);
    }
  };

  return (
    <>
      <li
        className={classNames({
          completed: todo.completed,
          updating,
          'view-2': todo.title !== updatedTitle,
        })}
        onDoubleClick={() => setUpdating(!updating)}
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
            aria-label="Delete Todo"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteHandler(todo.id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={updatedTitle}
          onChange={event => {
            setUpdatedTitle(event.target.value);
          }}
          onKeyDown={setNewTodoTitle}
        />
      </li>
    </>
  );
};
