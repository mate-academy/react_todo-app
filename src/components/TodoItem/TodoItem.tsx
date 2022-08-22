/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onDeleteTodo: (todoId: number) => void,
  onChangeComplited: (todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo, onDeleteTodo, onChangeComplited,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const onEditTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!event.target.value.trim()) {
        onDeleteTodo(todo.id);
      }

      setEditing(false);
      setTitle(event.target.value);
    }

    if (event.key === 'Escape') {
      setEditing(false);
      setTitle(todo.title);
    }
  };

  return (
    <>
      <li
        className={classNames({
          completed: todo.completed,
          editing: isEditing && !todo.completed,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={todo.completed}
            onChange={() => onChangeComplited(todo.id)}
          />
          <label onDoubleClick={() => setEditing(true)}>
            {todo.title}
          </label>
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
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={onEditTodo}
        />
      </li>
    </>
  );
};
