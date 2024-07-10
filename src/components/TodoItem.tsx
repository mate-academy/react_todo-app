/* eslint-disable react/display-name */
import React, { memo, useState } from 'react';
import { Form } from './Form';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoItem = memo(({ todo }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editHandler = () => {
    setIsEditing(true);
  };

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          // checked
        />
      </label>

      {isEditing ? (
        <Form className="todoapp__new-todo" />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={editHandler}
          >
            {todo.title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>
        </>
      )}
    </div>
  );
});
