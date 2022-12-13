/* eslint-disable jsx-a11y/control-has-associated-label */
// import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  deleteHandler: (todoId: number) => void,
  completeHandler: (todoId: number) => void,
  editHandler: (todoId: number, newTitle: string) => void,
  onEditing: (e: boolean) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteHandler,
  completeHandler,
  editHandler,
  onEditing,
}) => {
  // const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const setNewTodoTitle = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        editHandler(todo.id, editedTitle);
        onEditing(false);
      }

      if (event.key === 'Escape') {
        setEditedTitle(todo.title);
        onEditing(false);
      }
    }, [editedTitle],
  );

  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onClick={() => completeHandler(todo.id)}
          onChange={() => {}}
          checked={todo.completed}
        />
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
    </>
  );
};
