/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  onChangeComplete: (completed: boolean, id: number | undefined) => void,
  onClickDelete: (id: number | undefined) => void;
  onDoubleClick: (event: React.MouseEvent<HTMLLabelElement>) => boolean;
  onPressEnter: (title: string, id: number | undefined) => void,
};

const TodoItem: FC<Props> = ({
  todo, onChangeComplete, onClickDelete, onDoubleClick, onPressEnter,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);

  return (
    <li
      className={classNames({ editing }, { completed: todo.completed })}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          id={`${todo.id}`}
          onChange={() => {
            const checked = !todo.completed;

            onChangeComplete(checked, todo.id);
          }}
        />
        <label
          role="presentation"
          onKeyDown={() => {}}
          onClick={(event) => {
            setEditing(onDoubleClick(event));
          }}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            onClickDelete(todo.id);
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
                onPressEnter(title, todo.id);
                setEditing(false);
              } else {
                onClickDelete(todo.id);
                setEditing(false);
              }

              break;
            case 'Escape':
              setTitle(todo.title);
              setEditing(false);
              break;
            default:
              setTitle(event.target.value);
          }
        }}
        onBlur={() => {
          onPressEnter(title, todo.id);
          setEditing(false);
        }}
      />
    </li>
  );
};

export default TodoItem;
