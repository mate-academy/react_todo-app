import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  changeTodoStatus: (completed: boolean, todoId:number) => void;
  deleteTodo: (todoId: number) => void;
  editTitle: (todoTitle: string, todoId: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  changeTodoStatus,
  deleteTodo,
  editTitle,
}) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleChangeKeyboard = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':

        if (title.length === 0) {
          setEditing(false);
          deleteTodo(todo.id);
          break;
        }

        editTitle(title, todo.id);
        setEditing(false);
        break;

      case 'Escape':
        setEditing(false);
        setTitle(todo.title);
        break;

      default:
        setTitle(todo.title);
    }
  };

  return (
    <li
      className={classNames({ completed: todo.completed }, { editing })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => {
            const completed = !todo.completed;

            changeTodoStatus(completed, todo.id);
          }}
        />
        <label
          role="presentation"
          onDoubleClick={() => {
            setEditing(true);
          }}
        >
          {todo.title}
        </label>
        <button
          type="button"
          aria-label="Delete todo"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            deleteTodo(todo.id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        onKeyDown={handleChangeKeyboard}
      />
    </li>
  );
};
