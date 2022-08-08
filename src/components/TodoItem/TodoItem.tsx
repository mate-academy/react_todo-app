/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onDelete: (id: number) => void;
  onDoubleClick: (event: React.MouseEvent<HTMLLabelElement>) => boolean;
  onUpdateTitle: (id: number, title: string) => void,
  onUpdateStatus: (id: number, isComplited: boolean) => void,
};

export const TodoItem: FC<Props> = ({
  todo, onDelete, onDoubleClick, onUpdateTitle, onUpdateStatus,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [todoEditing, setTodoEditing] = useState(false);

  return (
    <li
      className={classNames({ editing: todoEditing }, { completed: todo.isCompleted })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.isCompleted}
          id={`${todo.id}`}
          onChange={() => {
            const checked = !todo.isCompleted;

            onUpdateStatus(todo.id, checked);
          }}
        />
        <label
          role="presentation"
          onKeyDown={() => {}}
          onClick={(event) => {
            setTodoEditing(onDoubleClick(event));
          }}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            onDelete(todo.id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onKeyDown={(event) => {
          switch (event.key) {
            case 'Enter':
              if (title.length > 0) {
                onUpdateTitle(todo.id, title);
                setTodoEditing(false);
              } else {
                onDelete(todo.id);
                setTodoEditing(false);
              }

              break;
            case 'Escape':
              setTitle(todo.title);
              setTodoEditing(false);
              break;
            default:
              setTitle(event.target.value);
          }
        }}
        onBlur={() => {
          onUpdateTitle(todo.id, title);
          setTodoEditing(false);
        }}
      />
    </li>
  );
};
