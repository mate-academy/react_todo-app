import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onTodoComplete: (todoId: number) => void;
  onTodoDestroy: (todoId: number) => void;
  onTodoEdit: (todoId: number, title: string) => void;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoItem: React.FC<Props> = ({
  todo,
  onTodoComplete,
  onTodoDestroy,
  onTodoEdit,
}) => {
  const [title, setTitleValue] = useState(todo.title);
  const [edit, setEdit] = useState(false);

  const onEdit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setEdit(false);
      setTitleValue(event.target.value);
      onTodoEdit(todo.id, title);

      if (!event.target.value) {
        onTodoDestroy(todo.id);
      }
    }

    if (event.key === 'Escape') {
      setEdit(false);
      setTitleValue(todo.title);
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      onTodoDestroy(todo.id);
    } else {
      setEdit(false);
      setTitleValue(event.target.value);
      onTodoEdit(todo.id, title);
    }
  };

  return (
    <li
      key={todo.id}
      className={classNames(
        {
          completed: todo.completed,
          editing: edit,
        },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onClick={() => onTodoComplete(todo.id)}
          checked={todo.completed}
        />

        <label
          onDoubleClick={() => setEdit(true)}
        >
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onTodoDestroy(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onChange={(event) => setTitleValue(event.target.value)}
        onKeyDown={onEdit}
        onBlur={onBlur}
      />
    </li>
  );
};
