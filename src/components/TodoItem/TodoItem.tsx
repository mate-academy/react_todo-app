/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types';

type Props = {
  todo: Todo,
  removeTodo: (todoId: number) => void,
  changeStatus: (todoId: number) => void,
  editTitle: (newTitle: string, todoId: number) => void,
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
  removeTodo,
  changeStatus,
  editTitle,
}) => {
  const [tempTitle, setTempTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li
      className={
        classNames({
          completed: todo.completed,
        }, {
          editing: isEditing,
        })
      }
      onDoubleClick={() => {
        setIsEditing(true);
        setTempTitle(todo.title);
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onClick={() => changeStatus(todo.id)}
        />
        <label htmlFor="toggle-view">
          {todo.title ? todo.title : `${removeTodo(todo.id)}`}
        </label>
        <button type="button" className="destroy" onClick={() => removeTodo(todo.id)} />
      </div>
      {isEditing && (
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          type="text"
          className="edit"
          value={tempTitle}
          onChange={event => setTempTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              editTitle(tempTitle, todo.id);
              setIsEditing(false);
            }

            if (event.key === 'Escape') {
              setIsEditing(false);
              setTempTitle(todo.title);
            }
          }}
          onBlur={() => {
            setIsEditing(false);
            setTempTitle(todo.title);
          }}
        />
      )}
    </li>
  );
});
