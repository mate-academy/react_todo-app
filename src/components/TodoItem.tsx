/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { FC, useState } from 'react';
import { Todo } from '../styles/Todo';

type Props = {
  todo: Todo,
  onUpdate(id: number, todo: Todo | null): void,
};

export const TodoItem: FC<Props> = ({ todo, onUpdate }) => {
  const [title, setTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);

  const handleEditTodo = (value: number) => {
    if (value === 2) {
      setEditing(true);
    }
  };

  const handleEdit = (typeOfChange: string, data: string | boolean) => {
    let newTodo: Todo | null = { ...todo };

    switch (typeOfChange) {
      case 'title':
        if (typeof data === 'string') {
          if (data.length === 0) {
            handleEdit('deleted', true);
            break;
          }

          newTodo.title = data;
        }

        break;
      case 'completed':
        if (typeof data === 'boolean') {
          newTodo.completed = data;
        }

        break;
      case 'deleted':
        newTodo = null;
        break;
      default:
    }

    onUpdate(todo.id, newTodo);
  };

  return (
    <li className={classNames({ editing, completed: todo.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={(event) => handleEdit('completed', event.target.checked)}
          checked={todo.completed}
        />

        <label
          role="presentation"
          onClick={(e) => handleEditTodo(e.detail)}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleEdit('deleted', true)}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={title}
        onChange={event => setTitle(event.target.value)}
        onKeyUp={event => {
          if (event.key === 'Enter') {
            handleEdit('title', title);
            setEditing(false);
          }

          window.console.log(event.key);

          if (event.key === 'Escape') {
            setTitle(todo.title);
            setEditing(false);
          }
        }}
        onBlur={() => {
          handleEdit('title', true);
          setEditing(false);
        }}
      />
    </li>
  );
};
