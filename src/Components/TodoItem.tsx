/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  toggleTodoStatus: (id: number) => void,
  deleteTodo: (id: number) => void,
  updateTitle: (id: number, title: string) => void
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodoStatus,
  deleteTodo,
  updateTitle,
}) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const setNewTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle(todo.title);
      setEditing(false);
    }

    if (event.key === 'Enter') {
      updateTitle(todo.id, title);
      setEditing(false);
    }
  };

  const onBlur = () => {
    if (!title.trim()) {
      deleteTodo(todo.id);
    } else {
      updateTitle(todo.id, title);
      setEditing(false);
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing,
      })}
      onDoubleClick={() => setEditing(!editing)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={todo.completed}
          onChange={() => toggleTodoStatus(todo.id)}
        />
        <label>{todo.title}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={setNewTitle}
        onBlur={onBlur}
      />
    </li>
  );
};
